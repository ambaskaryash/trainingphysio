"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Star, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Expert Physiotherapy
          <span className="text-primary block">At Your Fingertips</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access professional physiotherapy videos and exercises from certified experts. 
          Train at your own pace, anywhere, anytime.
        </p>
        <Button size="lg" asChild>
          <Link href="/plans">Get Started Today</Link>
        </Button>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <PlayCircle className="w-12 h-12 text-primary mb-4" />
              <CardTitle>HD Video Content</CardTitle>
              <CardDescription>
                High-quality videos with detailed instructions and demonstrations
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <Star className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Expert Guidance</CardTitle>
              <CardDescription>
                Learn from certified physiotherapy professionals
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <Clock className="w-12 h-12 text-primary mb-4" />
              <CardTitle>24/7 Access</CardTitle>
              <CardDescription>
                Practice at your own pace with unlimited access
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>For beginners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$9.99<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Access to basic exercises
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  HD video quality
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Most Popular</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$19.99<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  All basic features
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Advanced exercises
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Progress tracking
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For serious practitioners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$29.99<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  All Pro features
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Specialized programs
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  1-on-1 virtual consultation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}