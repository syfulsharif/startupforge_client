import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Check,
  Crown,
  CreditCard,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Flame,
  AlertTriangle
} from "lucide-react";

export const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser, addPayment, verifyPaymentSession, addToast } = useApp();
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(49); // Price updated to match backend options
  const [selectedPlanName, setSelectedPlanName] = useState("Founder Premium Plan");
  
  const [receiptCode, setReceiptCode] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const benefits = [
    "Secure 1st Tier placement on candidates browsing registries",
    "Simulate fast legal cofounder vesting contracts templates",
    "Post unlimited candidate-matching opportunities",
    "Simulate automatic alerts to builders within required skill-stacks",
    "Direct messaging integrations & real-time notification lines",
    "SEC compliant cofounder agreement builder tools"
  ];

  // Check URL parameters for Stripe redirect
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const canceled = searchParams.get("canceled");

    if (sessionId) {
      const verifySession = async () => {
        setLoading(true);
        try {
          const success = await verifyPaymentSession(sessionId);
          if (success) {
            setReceiptCode(sessionId);
            setReceiptDate(new Date().toLocaleDateString());
            setPaymentSuccess(true);
          } else {
            setPaymentError("Stripe payment verification failed. Please contact support.");
          }
        } catch (err) {
          setPaymentError("An error occurred while verifying the transaction.");
        } finally {
          setLoading(false);
        }
      };
      verifySession();
    } else if (canceled) {
      addToast("Subscription checkout cancelled. You have not been charged.", "info");
      navigate("/payment", { replace: true });
    }
  }, [searchParams]);

  const handleProcessUpgrade = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login", { state: { from: "/payment" } });
      return;
    }
    setLoading(true);
    try {
      await addPayment(selectedPlanPrice, selectedPlanName);
    } catch (err) {
      addToast("Failed to initiate subscription process.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto w-full">
        
        {loading && !paymentSuccess && (
          <div className="glass-card rounded-2xl p-16 text-center max-w-lg mx-auto shadow-xl space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="font-bold text-slate-900 dark:text-white text-base">Processing Transaction</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Please wait while we verify your checkout session and upgrade your rank privileges...
            </p>
          </div>
        )}

        {paymentError && (
          <div className="glass-card rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xl space-y-4 border border-rose-500/20">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
            <p className="font-bold text-slate-900 dark:text-white text-base">Transaction Error</p>
            <p className="text-xs text-slate-650 dark:text-slate-400">{paymentError}</p>
            <button 
              onClick={() => { setPaymentError(""); navigate("/payment", { replace: true }); }}
              className="mt-2 text-xs bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Back to Payment Upgrades
            </button>
          </div>
        )}

        {!loading && !paymentError && !paymentSuccess && (
          /* Checkout upgrade form */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left side benefits review panel */}
            <div className="glass-card rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl">
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
                  <Crown size={12} className="fill-amber-500" /> Platform Premium
                </span>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  Founder Premium Upgrade
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Accelerate your hiring sprint. Access targeted talent match filters, secured legal vesting layouts, and priority listings.
                </p>
              </div>

              {/* Pricing details */}
              <div className="p-5 border border-primary/30 bg-primary/5 rounded-xl text-left transition duration-200">
                <p className="text-xxs uppercase font-mono text-primary tracking-wider font-bold">PREMIUM LIFETIME UNLOCK</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">$49<span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> CAD</span></p>
                <p className="text-xxs text-slate-500 dark:text-slate-400 mt-1">One-time payment for unlimited listings access</p>
              </div>

              {/* Benefits list */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider mb-1">Checklist Benefits:</p>
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-2.5 items-start text-xs text-slate-650 dark:text-slate-300">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right side checkout payments fields card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-1.5 pb-3 border-b border-slate-200 dark:border-slate-850">
                <CreditCard size={18} className="text-primary" />
                <h2 className="font-display font-semibold text-slate-900 dark:text-white">Stripe Checkout Gateway</h2>
              </div>

              {!currentUser && (
                <div className="bg-amber-500/10 border border-amber-500/25 p-3.5 rounded-lg text-xxs text-amber-500 leading-normal font-sans">
                  <strong>Logged Out Mode:</strong> You must create or log into a founder account to purchase the premium subscription.
                </div>
              )}

              <form onSubmit={handleProcessUpgrade} className="space-y-4 text-xs text-slate-350 col-span-1">
                
                {/* Billing Summary description */}
                <div className="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-lg border border-slate-200 dark:border-slate-850 flex justify-between items-center text-xs font-sans">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-mono block">Billing plan selected:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{selectedPlanName}</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-base leading-none">${selectedPlanPrice} CAD</span>
                </div>

                <p className="text-xxs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Upon clicking checkout, you will be redirected to the secure Stripe Checkout gateway page. Transactions can be tested using test card details or the mock sandbox session URL.
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !currentUser}
                    className="w-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:brightness-110 disabled:opacity-40 text-slate-950 font-black py-3 rounded-lg text-xs transition flex items-center justify-center gap-1 border-0 cursor-pointer"
                  >
                    <Flame size={14} className="fill-slate-950" />
                    <span>Checkout on Stripe ($ {selectedPlanPrice})</span>
                  </button>
                </div>

              </form>

              <p className="text-[10px] text-slate-500 dark:text-slate-550 text-center leading-relaxed">
                Payments are processed securely via Stripe. PCI compliant.
              </p>

            </div>

          </div>
        )}

        {paymentSuccess && !loading && (
          /* Receipt success page details */
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 relative overflow-hidden shadow-2xl shadow-indigo-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center mx-auto">
              <ShieldCheck size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Upgrade finalized successfully!</h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Welcome to active Premium privileges on StartupForge, <strong>{currentUser?.name}</strong>!
              </p>
            </div>

            {/* Structured Receipt block info */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 text-xs text-left text-slate-600 dark:text-slate-400 space-y-2.5 font-sans relative">
              <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1 border-b border-slate-200 dark:border-slate-850 pb-2">
                <Receipt size={12} />
                <span>PCI-Certified Transaction Voucher Logs</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Account Subscriber</span>
                <span className="text-slate-900 dark:text-white font-semibold font-mono">{currentUser?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Voucher ID Ref</span>
                <span className="text-slate-900 dark:text-white font-mono text-[10px] break-all">{receiptCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Settled Fee</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">${selectedPlanPrice} CAD</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Date Settled</span>
                <span className="text-slate-700 dark:text-slate-300 font-mono">{receiptDate}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-850">
                <span>Status</span>
                <span className="bg-emerald-500/10 text-emerald-605 dark:text-emerald-400 py-0.2 px-2.5 rounded font-mono text-[10px] font-bold">SETTLED</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto text-xs">
              <Link
                to="/dashboard"
                className="bg-primary hover:bg-primary/95 text-white py-2.5 px-6 rounded-lg font-bold flex items-center justify-center gap-1 shadow-lg shadow-primary/20"
              >
                <span>Navigate to Workspace Dashboard</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/"
                className="text-slate-400 hover:text-slate-300 text-xxs block font-semibold uppercase mt-1 cursor-pointer"
              >
                Back to main home
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
