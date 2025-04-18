"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

type FeatureTab = {
  id: string
  title: string
  description: string
  image: string
  content: string
}

const features: FeatureTab[] = [
  {
    id: "craftsmanship",
    title: "Artisanal Craftsmanship",
    description: "Each perfume is meticulously crafted by our master perfumers",
    image: "/images/feature-craftsmanship.png",
    content: "Our perfumes are created with uncompromising attention to detail. We source the finest ingredients from around the world, working with local farmers and suppliers who share our commitment to quality and sustainability. Each fragrance is developed through a careful process of composition, where notes are balanced and refined over months of testing and iteration. We believe that true luxury emerges from this dedication to craft and the human touch present in every bottle.",
  },
  {
    id: "ingredients",
    title: "Premium Ingredients",
    description: "Only the finest natural ingredients make it into our formulations",
    image: "/images/feature-ingredients.png",
    content: "We believe that exceptional perfumes begin with exceptional ingredients. Our sourcing team travels globally to find the most exquisite raw materials – from Grasse jasmine to Madagascan vanilla, Italian bergamot to Haitian vetiver. We work directly with producers to ensure ethical practices and the highest quality standards. The natural complexity of these premium ingredients creates depth and character in our fragrances that cannot be replicated with synthetic alternatives, resulting in scents that evolve beautifully on the skin throughout the day.",
  },
  {
    id: "sustainability",
    title: "Sustainable Practices",
    description: "Environmentally conscious from sourcing to packaging",
    image: "/images/feature-sustainability.png",
    content: "Sustainability is woven into the fabric of our business. We carefully consider our environmental impact at every stage – from responsible ingredient sourcing to our innovative refill program that reduces packaging waste. Our bottles are designed to be both beautiful and recyclable, and our outer packaging uses FSC-certified papers and vegetable-based inks. We're constantly working to improve our practices, with a commitment to transparency about our journey toward greater sustainability. Choose smell&co for luxury without ecological compromise.",
  },
]

export function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState<string>(features[0].id)
  
  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-[10%] w-60 h-60 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            y: [0, -30, 0], 
            opacity: [0.5, 0.7, 0.5] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" as const
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            y: [0, 30, 0], 
            opacity: [0.4, 0.6, 0.4] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse" as const,
            delay: 1
          }}
        />
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
            What Makes Us <span className="text-primary">Different</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our commitment to excellence is evident in every aspect of our perfumes
          </motion.p>
        </div>

        <Tabs
          defaultValue={features[0].id}
          value={activeFeature}
          onValueChange={setActiveFeature}
          className="w-full"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full mb-12">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="py-6 text-left data-[state=active]:bg-background"
              >
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="bg-background rounded-lg p-6 md:p-10 min-h-[400px]">
            {features.map((feature) => (
              <TabsContent 
                key={feature.id} 
                value={feature.id}
                className="mt-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="heading-2">{feature.title}</h3>
                      <ScrollArea className="h-[200px] pr-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.content}
                        </p>
                      </ScrollArea>
                      <Button className="mt-6">Learn More</Button>
                    </motion.div>
                  </AnimatePresence>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg"
                    >
                      <Image 
                        src={feature.image} 
                        alt={feature.title} 
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
} 