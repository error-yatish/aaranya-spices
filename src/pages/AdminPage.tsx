import React, { useEffect, useState } from 'react';
import {
  Database,
  Package,
  ShoppingBag,
  Layers,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
  Lock,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  fetchAllOrders,
  updateOrderStatus,
  fetchSpiceBatches,
  fetchContactInquiries,
  StoredOrderRecord,
  SpiceBatchRecord,
  ContactInquiryRecord
} from '../services/backendService';
import { PRODUCTS } from '../data/catalog';
import { Badge, Button, Breadcrumbs } from '../components/ui/Primitives';

export const AdminPage: React.FC = () => {
  const {
    user,
    isAdminUnlocked,
    unlockAdminConsole,
    lockAdminConsole
  } = useAuth();

  const [adminEmail, setAdminEmail] = useState(user?.email || 'admin@aaranyaspices.com');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [gateError, setGateError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'orders' | 'inventory' | 'batches' | 'inquiries'
  >('orders');
  const [orders, setOrders] = useState<StoredOrderRecord[]>([]);
  const [batches, setBatches] = useState<SpiceBatchRecord[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [awbInputs, setAwbInputs] = useState<Record<string, string>>({});

  const loadData = async () => {
    setLoading(true);
    const [o, b, i] = await Promise.all([
      fetchAllOrders(),
      fetchSpiceBatches(),
      fetchContactInquiries()
    ]);
    setOrders(o);
    setBatches(b);
    setInquiries(i);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdminUnlocked) {
      loadData();
    }
  }, [isAdminUnlocked]);

  const handleGateUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError('');
    const res = await unlockAdminConsole(adminEmail, adminPasscode);
    if (!res.ok) {
      setGateError(res.error || 'Access denied.');
    }
  };

  const handleOrderStatusChange = async (
    orderRef: string,
    newStatus: StoredOrderRecord['orderStatus']
  ) => {
    const awb = awbInputs[orderRef];
    await updateOrderStatus(orderRef, newStatus, awb);
    await loadData();
  };

  const totalVariants = PRODUCTS.reduce((acc, p) => acc + p.variants.length, 0);
  const totalUnitsInStock = PRODUCTS.reduce(
    (acc, p) => acc + p.variants.reduce((s, v) => s + v.inventoryCount, 0),
    0
  );

  /* ADMIN SECURITY GATE IF NOT UNLOCKED */
  if (!isAdminUnlocked) {
    return (
      <>
        <SEOHead
          title="Admin Security Gate — AARANYA SPICES"
          description="Restricted Aaranya Spices Operations & Inventory Console."
          canonicalPath="/admin"
        />
        <div className="max-w-md mx-auto px-4 py-20 md:py-28">
          <div className="bg-[#EFECE3] border border-[#D5CFC2] p-8 sm:p-10 space-y-6">
            <div className="w-12 h-12 bg-[#182B21] text-[#C89236] flex items-center justify-center">
              <Lock size={22} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-semibold">
                Restricted Area · RBAC Protected
              </p>
              <h1 className="font-serif-editorial text-3xl text-[#1C1B18] mt-1">
                Operations Security Gate
              </h1>
              <p className="mt-2 text-xs text-[#5A564E] leading-relaxed">
                Enter your authorized operator email and Admin Security Key (`VITE_ADMIN_PASSCODE`) to unlock order management and inventory controls.
              </p>
            </div>

            {gateError && (
              <div className="p-3 bg-[#8E3B2E]/10 border border-[#8E3B2E] text-xs text-[#8E3B2E] flex items-center gap-2">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{gateError}</span>
              </div>
            )}

            <form onSubmit={handleGateUnlock} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-gate-email"
                  className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                >
                  Operator Email *
                </label>
                <input
                  id="admin-gate-email"
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-gate-passcode"
                  className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-1.5"
                >
                  Admin Security Key *
                </label>
                <input
                  id="admin-gate-passcode"
                  type="password"
                  required
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter security key (default: AARANYA2026)"
                  className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm font-mono-spec focus:outline-none focus:border-[#182B21]"
                />
                <p className="text-[11px] font-mono-spec text-[#847E74] mt-1.5">
                  Dev default passcode: <strong>AARANYA2026</strong>
                </p>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                UNLOCK OPERATIONS CONSOLE
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Backend & Operations Console — AARANYA SPICES"
        description="Manage Aaranya Spices orders, SKU inventory, seed-to-jar batch traceability, and Supabase backend status."
        canonicalPath="/admin"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2DDD2]">
          <div>
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Operations Console' }]}
            />
            <p className="text-xs uppercase tracking-[0.22em] text-[#6D4C38] font-medium">
              Aaranya Backoffice & Supabase Engine · Operator: {user?.email || adminEmail}
            </p>
            <h1 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] mt-1">
              OPERATIONS & INVENTORY CONSOLE
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 bg-[#EFECE3] border border-[#D5CFC2] flex items-center gap-2.5 text-xs">
              <Database size={15} className="text-[#182B21]" />
              <span>Engine:</span>
              {isSupabaseConfigured ? (
                <span className="font-mono-spec text-[#2A5A3B] font-semibold">
                  Supabase PostgreSQL + RLS
                </span>
              ) : (
                <span className="font-mono-spec text-[#6D4C38] font-semibold">
                  Hybrid Local DB (.env ready)
                </span>
              )}
            </div>
            <Button variant="secondary" size="sm" onClick={loadData}>
              <RefreshCw size={13} className="mr-1.5" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={lockAdminConsole}>
              <LogOut size={13} className="mr-1.5" />
              Lock Console
            </Button>
          </div>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#EFECE3] border border-[#E2DDD2]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A564E]">
              Total Orders
            </span>
            <p className="font-serif-editorial text-3xl text-[#1C1B18] mt-1 font-mono-spec">
              {orders.length}
            </p>
          </div>
          <div className="p-5 bg-[#EFECE3] border border-[#E2DDD2]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A564E]">
              Active SKUs & Variants
            </span>
            <p className="font-serif-editorial text-3xl text-[#1C1B18] mt-1 font-mono-spec">
              {PRODUCTS.length} Spices · {totalVariants} SKUs
            </p>
          </div>
          <div className="p-5 bg-[#EFECE3] border border-[#E2DDD2]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A564E]">
              Units in Pantry Vault
            </span>
            <p className="font-serif-editorial text-3xl text-[#1C1B18] mt-1 font-mono-spec">
              {totalUnitsInStock} Jars
            </p>
          </div>
          <div className="p-5 bg-[#EFECE3] border border-[#E2DDD2]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A564E]">
              Traceable Harvest Batches
            </span>
            <p className="font-serif-editorial text-3xl text-[#1C1B18] mt-1 font-mono-spec">
              {batches.length} Lots
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E2DDD2] pb-4">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag size={14} /> },
            { id: 'inventory', label: `SKU Inventory (${totalVariants})`, icon: <Package size={14} /> },
            { id: 'batches', label: `Batch Traceability (${batches.length})`, icon: <Layers size={14} /> },
            { id: 'inquiries', label: `Customer Inquiries (${inquiries.length})`, icon: <MessageSquare size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                  : 'bg-[#EFECE3] text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-[#5A564E]">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="p-10 bg-[#EFECE3]/60 border border-[#E2DDD2] text-center space-y-2">
                <p className="font-serif-editorial text-2xl text-[#1C1B18]">
                  No orders placed yet
                </p>
                <p className="text-xs text-[#5A564E]">
                  Place a test order via the Checkout page to see it appear here in real time.
                </p>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.orderReference}
                  className="p-6 bg-[#EFECE3] border border-[#E2DDD2] space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D5CFC2]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-spec text-sm font-semibold text-[#182B21]">
                        {ord.orderReference}
                      </span>
                      <Badge tone="forest">{ord.orderStatus}</Badge>
                      <Badge tone="ochre">{ord.paymentStatus}</Badge>
                    </div>
                    <span className="text-xs font-mono-spec text-[#5A564E]">
                      {new Date(ord.createdAt).toLocaleString('en-IN')} · Engine:{' '}
                      {ord.storageEngine}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div>
                      <p className="uppercase tracking-[0.14em] text-[#6D4C38] font-semibold mb-1">
                        Customer & Address
                      </p>
                      <p className="text-[#1C1B18] font-medium">{ord.customer.name}</p>
                      <p className="text-[#5A564E]">
                        {ord.customer.email} · {ord.customer.mobile}
                      </p>
                      <p className="text-[#5A564E] mt-1">
                        {ord.customer.address}, {ord.customer.city}, {ord.customer.state} —{' '}
                        {ord.customer.pinCode}
                      </p>
                    </div>

                    <div>
                      <p className="uppercase tracking-[0.14em] text-[#6D4C38] font-semibold mb-1">
                        Line Items
                      </p>
                      <ul className="space-y-1 font-mono-spec text-[#1C1B18]">
                        {ord.items.map((item) => (
                          <li key={item.sku}>
                            {item.name} ({item.weight}) × {item.quantity} — ₹
                            {item.price * item.quantity}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 font-mono-spec font-semibold text-[#182B21]">
                        Total: ₹{ord.pricing.total.toLocaleString('en-IN')} (
                        {ord.customer.paymentMethod.toUpperCase()})
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="uppercase tracking-[0.14em] text-[#6D4C38] font-semibold">
                        Update Fulfilment & Shiprocket AWB
                      </p>
                      <input
                        type="text"
                        placeholder={ord.awbTrackingCode || 'Enter AWB Tracking Code'}
                        value={awbInputs[ord.orderReference] ?? ord.awbTrackingCode ?? ''}
                        onChange={(e) =>
                          setAwbInputs((prev) => ({
                            ...prev,
                            [ord.orderReference]: e.target.value
                          }))
                        }
                        className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-3 py-1.5 font-mono-spec text-xs"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {(['RECEIVED', 'PACKED', 'DISPATCHED', 'DELIVERED'] as const).map(
                          (st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() =>
                                handleOrderStatusChange(ord.orderReference, st)
                              }
                              className={`px-2.5 py-1 text-[10px] font-mono-spec border cursor-pointer ${
                                ord.orderStatus === st
                                  ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                                  : 'bg-[#F7F4ED] text-[#1C1B18] border-[#D5CFC2]'
                              }`}
                            >
                              {st}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="overflow-x-auto bg-[#EFECE3] border border-[#E2DDD2]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D5CFC2] bg-[#E2DDD2]/60 uppercase tracking-[0.14em] text-[#5A564E]">
                  <th className="py-3.5 px-4">Spice</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Pack Weight</th>
                  <th className="py-3.5 px-4">Price (INR)</th>
                  <th className="py-3.5 px-4">Stock Count</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5CFC2] font-mono-spec">
                {PRODUCTS.flatMap((product) =>
                  product.variants.map((v) => (
                    <tr key={v.sku} className="hover:bg-[#F7F4ED]/60">
                      <td className="py-3 px-4 font-sans-ui font-medium text-[#1C1B18]">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 font-sans-ui text-[#5A564E]">
                        {product.categoryLabel}
                      </td>
                      <td className="py-3 px-4 text-[#182B21]">{v.sku}</td>
                      <td className="py-3 px-4">{v.weight}</td>
                      <td className="py-3 px-4">₹{v.price}</td>
                      <td className="py-3 px-4">{v.inventoryCount} jars</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[#2A5A3B]">
                          <CheckCircle2 size={12} /> In Stock
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: BATCH TRACEABILITY */}
        {activeTab === 'batches' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.map((batch) => (
              <div
                key={batch.batchCode}
                className="p-6 bg-[#EFECE3] border border-[#E2DDD2] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-spec text-xs px-2.5 py-1 bg-[#182B21] text-[#C89236]">
                    {batch.batchCode}
                  </span>
                  <span className="text-xs font-mono-spec text-[#5A564E]">
                    Milled: {batch.milledDate}
                  </span>
                </div>
                <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">
                  {batch.productName}
                </h3>
                <p className="text-xs text-[#5A564E]">{batch.sensoryNotes}</p>
                <div className="pt-3 border-t border-[#D5CFC2] grid grid-cols-2 gap-2 text-xs font-mono-spec text-[#5A564E]">
                  <div>Origin: {batch.sourcingRegion}</div>
                  <div>Harvest: {batch.harvestWindow}</div>
                  <div>Best Before: {batch.bestBeforeDate}</div>
                  <div>Compliance: {batch.certificationRef}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="p-10 bg-[#EFECE3]/60 border border-[#E2DDD2] text-center">
                <p className="font-serif-editorial text-2xl text-[#1C1B18]">
                  No customer inquiries recorded yet
                </p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-6 bg-[#EFECE3] border border-[#E2DDD2] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.16em] text-[#6D4C38] font-semibold">
                      {inq.subject}
                    </span>
                    <span className="text-xs font-mono-spec text-[#847E74]">
                      {new Date(inq.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="font-serif-editorial text-xl text-[#1C1B18]">
                    {inq.name} ({inq.email})
                  </p>
                  <p className="text-sm text-[#5A564E]">{inq.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};
