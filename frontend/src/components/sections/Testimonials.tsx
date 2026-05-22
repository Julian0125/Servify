import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '../../types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header removed as requested */}

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-100" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <span className={`ml-auto px-2 py-1 text-xs font-medium rounded-full ${
                  testimonial.type === 'professional'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {testimonial.type === 'professional' ? 'Profesional' : 'Cliente'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-6 rounded-lg bg-gray-50">
            <p className="text-3xl font-bold text-gray-900">4.9</p>
            <p className="text-sm text-gray-600 mt-1">Calificacion promedio</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-gray-50">
            <p className="text-3xl font-bold text-gray-900">95%</p>
            <p className="text-sm text-gray-600 mt-1">Satisfaccion</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-gray-50">
            <p className="text-3xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-600 mt-1">Resenas verificadas</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-gray-50">
            <p className="text-3xl font-bold text-gray-900">30 min</p>
            <p className="text-sm text-gray-600 mt-1">Tiempo de respuesta</p>
          </div>
        </div>
      </div>
    </section>
  )
}
