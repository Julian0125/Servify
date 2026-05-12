import { useState } from 'react'
import {
  Wrench, Zap, Paintbrush, GraduationCap, Home, Camera, Code, Scissors,
  Search, MapPin, SlidersHorizontal
} from 'lucide-react'
import type { Category } from '../../types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Zap, Paintbrush, GraduationCap, Home, Camera, Code, Scissors
}

const locations = [
  'Todas las zonas',
  'Bucaramanga Centro',
  'Cabecera',
  'San Alonso',
  'Floridablanca',
  'Giron',
  'Piedecuesta',
]

interface ServiceCategoriesProps {
  categories: Category[]
  onSearch: (query: string, location: string, categoryId: string) => void
}

export function ServiceCategories({ categories, onSearch }: ServiceCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('Todas las zonas')

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId
    setSelectedCategory(newCategory)
    onSearch(searchQuery, selectedLocation, newCategory || '')
  }

  const handleSearch = () => {
    onSearch(searchQuery, selectedLocation, selectedCategory || '')
  }

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            Categorias de Servicio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Encuentra el servicio que necesitas
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explora nuestras categorias y encuentra profesionales verificados cerca de ti
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 pr-8 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[180px]"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleSearch}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Buscar
            </button>
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Wrench
            const isSelected = selectedCategory === category.id

            return (
              <div
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 rounded-xl bg-white p-6 text-center border ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg border-blue-500' : 'border-gray-100'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.count} profesionales</p>
              </div>
            )
          })}
        </div>

        {/* View all button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Ver todas las categorias
          </button>
        </div>
      </div>
    </section>
  )
}
