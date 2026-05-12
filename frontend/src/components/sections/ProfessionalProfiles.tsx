import { useState } from 'react'
import { Star, MapPin, Clock, Shield, MessageSquare, Phone, ChevronLeft, ChevronRight, Crown } from 'lucide-react'
import type { Professional } from '../../types'

interface ProfessionalCardProps {
  professional: Professional
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <div className={`h-full flex flex-col bg-white rounded-xl shadow-sm border transition-all hover:shadow-lg ${
      professional.premium ? 'border-blue-200' : 'border-gray-100'
    }`}>
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg border-2 border-white shadow-md">
                {professional.avatar}
              </div>
              {professional.verified && (
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                {professional.premium && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <p className="text-sm text-gray-500">{professional.profession}</p>
            </div>
          </div>
          <span className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full ${
            professional.premium ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}>
            {professional.hourlyRate}
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{professional.description}</p>

        <div className="flex flex-wrap gap-2">
          {professional.skills.map((skill) => (
            <span key={skill} className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">
              {skill}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-900">{professional.rating}</span>
            <span>({professional.reviews} resenas)</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{professional.location}</span>
            <span className="text-blue-600 font-medium">- {professional.distance}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{professional.responseTime}</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-4 border-t border-gray-100 flex gap-2">
        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageSquare className="h-4 w-4" />
          Mensaje
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <Phone className="h-4 w-4" />
          Contactar
        </button>
      </div>
    </div>
  )
}

interface ProfessionalProfilesProps {
  professionals: Professional[]
}

export function ProfessionalProfiles({ professionals }: ProfessionalProfilesProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(professionals.length / itemsPerPage)

  const currentProfessionals = professionals.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <section id="profesionales" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              Profesionales Destacados
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Los mejor calificados cerca de ti
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Profesionales verificados con las mejores resenas de la comunidad. 
              Ordenados por cercania y calificacion.
            </p>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="inline-flex items-center justify-center h-10 w-10 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 px-2">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="inline-flex items-center justify-center h-10 w-10 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Professionals grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProfessionals.map((professional) => (
            <ProfessionalCard key={professional.id} professional={professional} />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Ver todos los profesionales
          </button>
        </div>
      </div>
    </section>
  )
}
