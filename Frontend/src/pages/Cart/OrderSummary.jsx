import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, ShieldCheck, CreditCard, Truck } from 'lucide-react'

const OrderSummary = ({ subtotal, shipping, tax, hasUnavailableItems }) => {
    const total = subtotal + shipping + tax

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col h-fit sticky top-24">
            <h2 className="text-xl font-bold tracking-tight text-[#111111] mb-6">Order Summary</h2>

            {/* Cost Breakdowns */}
            <ul className="text-[#6b7280] text-sm space-y-4 mb-6">
                <li className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111111]">₹{subtotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#111111]">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </li>
                <li className="flex justify-between items-center">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-[#111111]">₹{tax.toFixed(2)}</span>
                </li>
            </ul>

            <div className="border-t border-gray-100 my-6"></div>

            {/* Total */}
            <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold text-[#111111]">Total</span>
                <span className="text-2xl font-black text-[#111111]">₹{total.toFixed(2)}</span>
            </div>

            {/* Coupon Application */}
            <div className="mb-8">
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        placeholder="Promo code"
                        className="rounded-xl border-gray-200 focus:border-[#111111] bg-[#f8f8f8]"
                    />
                    <Button variant="outline" className="rounded-xl border-gray-200 text-[#111111] hover:bg-[#f8f8f8] hover:border-[#111111]">
                        Apply
                    </Button>
                </form>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
                <Button
                    disabled={hasUnavailableItems}
                    className="w-full bg-[#111111] text-white hover:bg-black/90 rounded-xl h-14 text-base font-bold active:scale-[0.98] transition-all flex justify-between px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                </Button>
                {hasUnavailableItems && (
                    <p className="text-red-500 text-xs font-medium text-center px-2">
                        Please remove unavailable items before proceeding.
                    </p>
                )}
                <Button variant="outline" className="w-full bg-white text-[#111111] border-gray-200 hover:bg-[#f8f8f8] hover:border-[#111111] rounded-xl h-14 text-sm font-semibold active:scale-[0.98] transition-all">
                    Continue Shopping
                </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-auto bg-[#f8f8f8] rounded-xl p-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-[#111111] flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> Secure Payments • 100% Buyer Protection
                </p>
                <div className="flex items-center justify-center gap-1.5 text-gray-400">
                    <CreditCard className="w-8 h-8 opacity-70" />
                    {/* Can inject more SVG card icons here like Visa/Mastercard */}
                </div>
                <p className="text-xs font-medium text-[#6b7280] text-center flex items-center justify-center gap-1.5 mt-1 border-t border-gray-200 pt-3">
                    <Truck className="w-4 h-4" /> Delivery by 3–5 business days
                </p>
            </div>
        </div>
    )
}

export default OrderSummary
