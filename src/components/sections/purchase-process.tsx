"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  Heart,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Step = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    id: 1,
    title: "Select Your Fragrance",
    description: "Browse our collection and discover the perfect scent that resonates with your personality and style.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Add to Cart",
    description: "Choose your desired size and quantity, then add your selection to your shopping cart.",
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Secure Checkout",
    description: "Complete your purchase with our secure checkout process, offering multiple payment options.",
    icon: <Package className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Swift Delivery",
    description: "Your fragrance will be carefully packaged and delivered to your doorstep in elegant presentation.",
    icon: <Truck className="h-6 w-6" />,
  },
]

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function PurchaseProcess() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      </div>
      
      <div className="perfume-container relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            className="heading-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Simple, Elegant Shopping
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We've designed our purchase journey to be as refined as our fragrances
          </motion.p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center mb-12 relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-px bg-primary -translate-y-1/2 transition-all duration-500 ease-in-out"
            style={{ width: `${(activeStep - 1) * 33.3}%` }}
          />
          
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative z-10 flex flex-col items-center gap-2"
              onMouseEnter={() => setActiveStep(step.id)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.id <= activeStep 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <div className="font-medium text-sm text-center hidden md:block">
                {step.title}
              </div>
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <div className="bg-card rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`transition-all duration-500 ${
                step.id === activeStep ? "opacity-100 scale-100" : "opacity-0 scale-95 h-0 overflow-hidden"
              }`}
            >
              {step.id === activeStep && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={itemAnimation} className="bg-card rounded-lg p-6 shadow-md">
            <h3 className="font-medium mb-2">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">Enjoy complimentary shipping on all orders over $100.</p>
          </motion.div>
          <motion.div variants={itemAnimation} className="bg-card rounded-lg p-6 shadow-md">
            <h3 className="font-medium mb-2">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">Not completely satisfied? Return within 30 days, no questions asked.</p>
          </motion.div>
          <motion.div variants={itemAnimation} className="bg-card rounded-lg p-6 shadow-md">
            <h3 className="font-medium mb-2">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">All transactions are encrypted and secure for your peace of mind.</p>
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button size="lg" className="gap-2">
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
} 