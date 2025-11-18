"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleSignUp = () => {
    alert('Signing up with Google...')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, password }),
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>({error:'Signup failed'}))
        throw new Error(err.error || 'Signup failed')
      }
      // signup returns user object; now login to get token
      const login = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!login.ok) throw new Error('Signup succeeded but login failed')
      const data = await login.json()
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        router.push('/')
      }
    } catch (err: any) {
      alert(err.message || 'Signup failed')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left blue panel */}
        <section className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 text-white p-16 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center font-bold">R</div>
              <span className="text-lg font-semibold">RentWheels</span>
            </div>

            <h2 className="mt-12 text-4xl font-serif font-bold">Join Our Community</h2>
            <p className="mt-4 text-lg text-white/90 max-w-lg">Get exclusive access to deals and premium vehicles.</p>

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">✨</div>
                <div>
                  <p className="font-semibold">Exclusive Deals</p>
                  <p className="text-sm text-white/80">Save up to 30% on premium rentals</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">🎯</div>
                <div>
                  <p className="font-semibold">Quick Checkout</p>
                  <p className="text-sm text-white/80">Complete bookings in under 2 minutes</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">🏆</div>
                <div>
                  <p className="font-semibold">Loyalty Rewards</p>
                  <p className="text-sm text-white/80">Earn points on every rental</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-sm text-white/80">© 2025 RentWheels. All rights reserved.</div>
        </section>

        {/* Right form panel */}
        <section className="w-1/2 bg-white p-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-serif font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-500">Join RentWheels and start exploring</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="John" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" name="confirm" type="password" placeholder="••••••" />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="h-4 w-4" />
                I agree to the <Link href="#" className="text-blue-600">Terms of Service</Link> and <Link href="#" className="text-blue-600">Privacy Policy</Link>
              </label>

              <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white">Create Account</Button>

              <div className="mt-6 border-t pt-6 text-center">
                <p className="text-gray-500">Already have an account?</p>
                <Link href="/login" className="inline-block mt-4 text-blue-600">Sign in</Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400">Or continue with</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button onClick={handleGoogleSignUp} className="w-full">Google</Button>
                  <Button className="w-full">GitHub</Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
