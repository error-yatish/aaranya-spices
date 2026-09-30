import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShieldCheck,
  KeyRound,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { useAuth } from '../context/AuthContext';
import { fetchAllOrders, StoredOrderRecord } from '../services/backendService';
import { Badge, Breadcrumbs, Button } from '../components/ui/Primitives';

export const AccountPage: React.FC = () => {
  const {
    user,
    signInWithPassword,
    signUpCustomer,
    signInWithMagicLink,
    updateUserProfile,
    signOut
  } = useAuth();

  const [authTab, setAuthTab] = useState<'signin' | 'signup' | 'magic'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [authError, setAuthError] = useState('');
  const [authFeedback, setAuthFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Signed-in customer state
  const [myOrders, setMyOrders] = useState<StoredOrderRecord[]>([]);
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    mobile: '',
    defaultAddress: '',
    defaultCity: '',
    defaultState: 'Maharashtra',
    defaultPincode: ''
  });
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setAddressForm({
        fullName: user.fullName || '',
        mobile: user.mobile || '',
        defaultAddress: user.defaultAddress || '',
        defaultCity: user.defaultCity || '',
        defaultState: user.defaultState || 'Maharashtra',
        defaultPincode: user.defaultPincode || ''
      });

      fetchAllOrders().then((all) => {
        const filtered = all.filter(
          (o) => o.customer.email.toLowerCase() === user.email.toLowerCase()
        );
        setMyOrders(filtered);
      });
    }
  }, [user]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    const res = await signInWithPassword(email, password);
    setSubmitting(false);
    if (!res.ok) {
      setAuthError(res.error || 'Unable to sign in.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    const res = await signUpCustomer({ fullName, email, mobile, password });
    setSubmitting(false);
    if (!res.ok) {
      setAuthError(res.error || 'Unable to create account.');
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    const res = await signInWithMagicLink(email);
    setSubmitting(false);
    if (!res.ok) {
      setAuthError(res.message);
    } else {
      setAuthFeedback(res.message);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(addressForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <>
      <SEOHead
        title="Customer Account & Orders — AARANYA SPICES"
        description="Sign in to your Aaranya Spices account to track orders, manage delivery addresses, and view your spice pantry history."
        canonicalPath="/account"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />

        {!user ? (
          /* SIGNED-OUT VIEW: SIGN IN / CREATE ACCOUNT / MAGIC LINK */
          <div className="mt-6 max-w-xl mx-auto bg-[#EFECE3] border border-[#E2DDD2] p-8 sm:p-12 space-y-8">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-[#6D4C38] font-medium">
                The Aaranya Table
              </p>
              <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18]">
                {authTab === 'signin'
                  ? 'Welcome Back'
                  : authTab === 'signup'
                  ? 'Create Your Account'
                  : 'Passwordless Sign-In'}
              </h1>
              <p className="text-xs text-[#5A564E]">
                Track active spice shipments, save delivery addresses, and reorder essentials.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 border border-[#D5CFC2] bg-[#F7F4ED] p-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signin');
                  setAuthError('');
                  setAuthFeedback('');
                }}
                className={`py-2.5 uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                  authTab === 'signin'
                    ? 'bg-[#182B21] text-[#F7F4ED]'
                    : 'text-[#5A564E] hover:text-[#1C1B18]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signup');
                  setAuthError('');
                  setAuthFeedback('');
                }}
                className={`py-2.5 uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                  authTab === 'signup'
                    ? 'bg-[#182B21] text-[#F7F4ED]'
                    : 'text-[#5A564E] hover:text-[#1C1B18]'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('magic');
                  setAuthError('');
                  setAuthFeedback('');
                }}
                className={`py-2.5 uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                  authTab === 'magic'
                    ? 'bg-[#182B21] text-[#F7F4ED]'
                    : 'text-[#5A564E] hover:text-[#1C1B18]'
                }`}
              >
                Magic Link
              </button>
            </div>

            {authError && (
              <div className="p-3.5 bg-[#8E3B2E]/10 border border-[#8E3B2E] text-xs text-[#8E3B2E]">
                {authError}
              </div>
            )}

            {authFeedback && (
              <div className="p-3.5 bg-[#2A5A3B]/10 border border-[#2A5A3B] text-xs text-[#2A5A3B]">
                {authFeedback}
              </div>
            )}

            {/* TAB 1: PASSWORD SIGN IN */}
            {authTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label
                    htmlFor="signin-email"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="signin-password"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Password *
                  </label>
                  <input
                    id="signin-password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={submitting}
                >
                  <KeyRound size={14} className="mr-2" />
                  {submitting ? 'SIGNING IN...' : 'SIGN IN'}
                </Button>
              </form>
            )}

            {/* TAB 2: REGISTER NEW CUSTOMER */}
            {authTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label
                    htmlFor="signup-name"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aarav Mehta"
                    className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav@example.com"
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-mobile"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="signup-mobile"
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Create Password (min 6 chars) *
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={submitting}
                >
                  {submitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                </Button>
              </form>
            )}

            {/* TAB 3: MAGIC LINK OTP */}
            {authTab === 'magic' && (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label
                    htmlFor="magic-email"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="magic-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={submitting}
                >
                  <Sparkles size={14} className="mr-2" />
                  {submitting ? 'SENDING LINK...' : 'SEND ONE-TIME SIGN-IN LINK'}
                </Button>
              </form>
            )}

            <div className="pt-4 border-t border-[#D5CFC2] flex items-center justify-between text-xs text-[#5A564E]">
              <span>Operations Staff?</span>
              <Link to="/admin" className="text-[#182B21] font-semibold underline">
                Go to Admin Security Gate →
              </Link>
            </div>
          </div>
        ) : (
          /* SIGNED-IN CUSTOMER DASHBOARD */
          <div className="mt-6 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-[#182B21] text-[#F7F4ED]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C89236]">
                    Signed In · {user.authProvider === 'supabase' ? 'Supabase Auth' : 'Local Session'}
                  </span>
                  {user.role === 'admin' && <Badge tone="ochre">Admin Role</Badge>}
                </div>
                <h1 className="font-serif-editorial text-3xl sm:text-4xl">
                  Welcome, {user.fullName}
                </h1>
                <p className="text-xs font-mono-spec text-[#E2DDD2]/80">
                  {user.email} {user.mobile ? `· ${user.mobile}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2.5 bg-[#C89236] text-[#182B21] text-xs uppercase tracking-[0.16em] font-semibold"
                  >
                    Admin Console
                  </Link>
                )}
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#E2DDD2]/40 hover:border-[#F7F4ED] text-xs uppercase tracking-[0.16em] text-[#F7F4ED] cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left: Order History */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-[#182B21]" />
                  <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                    Your Spice Orders ({myOrders.length})
                  </h2>
                </div>

                {myOrders.length === 0 ? (
                  <div className="p-8 bg-[#EFECE3] border border-[#E2DDD2] space-y-3">
                    <p className="font-serif-editorial text-2xl text-[#1C1B18]">
                      No orders found for {user.email}
                    </p>
                    <p className="text-xs text-[#5A564E]">
                      When you place an order at Checkout using {user.email}, it will appear here with live dispatch status and AWB tracking.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block bg-[#182B21] text-[#F7F4ED] text-xs uppercase tracking-[0.16em] px-6 py-3 mt-2"
                    >
                      Explore Spices
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myOrders.map((ord) => (
                      <div
                        key={ord.orderReference}
                        className="p-6 bg-[#EFECE3] border border-[#E2DDD2] space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D5CFC2]">
                          <span className="font-mono-spec text-sm font-semibold text-[#182B21]">
                            {ord.orderReference}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge tone="forest">{ord.orderStatus}</Badge>
                            <Badge tone="ivory">{ord.paymentStatus}</Badge>
                          </div>
                        </div>
                        <ul className="text-xs font-mono-spec text-[#1C1B18] space-y-1">
                          {ord.items.map((item) => (
                            <li key={item.sku}>
                              {item.name} ({item.weight}) × {item.quantity} — ₹
                              {item.price * item.quantity}
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-[#5A564E]">
                          <span>
                            Ordered: {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                            {ord.awbTrackingCode
                              ? ` · AWB: ${ord.awbTrackingCode}`
                              : ''}
                          </span>
                          <span className="font-mono-spec font-semibold text-[#1C1B18]">
                            Total: ₹{ord.pricing.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Saved Delivery Address */}
              <div className="lg:col-span-5 bg-[#EFECE3] border border-[#E2DDD2] p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#182B21]" />
                  <h2 className="font-serif-editorial text-2xl text-[#1C1B18]">
                    Default Delivery Address
                  </h2>
                </div>
                <p className="text-xs text-[#5A564E]">
                  Saved details are automatically pre-filled when you visit Checkout.
                </p>

                <form onSubmit={handleSaveAddress} className="space-y-4">
                  <div>
                    <label
                      htmlFor="prof-name"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="prof-name"
                      type="text"
                      value={addressForm.fullName}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, fullName: e.target.value })
                      }
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prof-mobile"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="prof-mobile"
                      type="tel"
                      value={addressForm.mobile}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, mobile: e.target.value })
                      }
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prof-addr"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                    >
                      Street Address
                    </label>
                    <input
                      id="prof-addr"
                      type="text"
                      value={addressForm.defaultAddress}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          defaultAddress: e.target.value
                        })
                      }
                      placeholder="House No., Street, Locality"
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="prof-city"
                        className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                      >
                        City
                      </label>
                      <input
                        id="prof-city"
                        type="text"
                        value={addressForm.defaultCity}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            defaultCity: e.target.value
                          })
                        }
                        className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prof-pin"
                        className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                      >
                        PIN Code
                      </label>
                      <input
                        id="prof-pin"
                        type="text"
                        maxLength={6}
                        value={addressForm.defaultPincode}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            defaultPincode: e.target.value
                          })
                        }
                        className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-3.5 py-2.5 text-sm font-mono-spec"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" fullWidth>
                    {profileSaved ? (
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Saved Default Address
                      </span>
                    ) : (
                      'Save Address'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
