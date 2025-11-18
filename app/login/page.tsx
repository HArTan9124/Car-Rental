"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleSignIn = () => {
    // placeholder for OAuth flow
    alert('Signing in with Google...')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const err = await res.json().catch(()=>({error:'Login failed'}))
        throw new Error(err.error || 'Login failed')
      }
      const data = await res.json()
      const token = data.token
      if (token) {
        localStorage.setItem('authToken', token)
        router.push('/')
      }
    } catch (err: any) {
      alert(err.message || 'Login failed')
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

            <h2 className="mt-12 text-4xl font-serif font-bold">Your Journey Starts Here</h2>
            <p className="mt-4 text-lg text-white/90 max-w-lg">Access premium car rentals with seamless booking and unbeatable prices.</p>

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">🚗</div>
                <div>
                  <p className="font-semibold">Premium Fleet</p>
                  <p className="text-sm text-white/80">Choose from our extensive collection of luxury and economy vehicles.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">⚡</div>
                <div>
                  <p className="font-semibold">Instant Booking</p>
                  <p className="text-sm text-white/80">Complete your reservation in minutes with our streamlined process.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">🔒</div>
                <div>
                  <p className="font-semibold">Secure & Safe</p>
                  <p className="text-sm text-white/80">Your data is protected with enterprise-grade security.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-sm text-white/80">© 2025 RentWheels. All rights reserved.</div>
        </section>

        {/* Right form panel */}
        <section className="w-1/2 bg-white p-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-serif font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-500">Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="h-4 w-4" />
                  Remember me
                </label>
                <Link href="#" className="text-sm text-blue-600">Forgot password?</Link>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>

              <div className="mt-6 border-t pt-6 text-center">
                <p className="text-gray-500">Don't have an account?</p>
                <Link href="/signup" className="inline-block mt-4 border rounded-md px-6 py-2 text-blue-600">Create Account</Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400">Or continue with</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button onClick={handleGoogleSignIn} className="w-full">Google</Button>
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
