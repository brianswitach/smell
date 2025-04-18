// Define type directly to avoid import errors
export interface Perfume {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  volume: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

// Fallback data in case API fetch fails
const fallbackPerfumes: Perfume[] = [
  {
    id: "lattafa-yara",
    name: "Lattafa Yara",
    shortDescription: "Fragancia con notas de Ananá tropical, Toque floral, Vainilla",
    description: "Una exquisita combinación de Ananá tropical, Toque floral, Vainilla, creando una experiencia olfativa única y sofisticada.",
    price: 49000,
    image: "https://lattafa.al/cdn/shop/files/image_tpO.webp?v=1721595528",
    notes: {
      top: ["Ananá tropical"],
      middle: ["Toque floral"],
      base: ["Vainilla"],
    },
    volume: "100ml",
    isNew: true
  },
  {
    id: "lattafa-badee",
    name: "Lattafa Bade'e Al Oud",
    shortDescription: "Fragancia con notas de Oud (madera de agar), Azafrán, Nuez moscada",
    description: "Una exquisita combinación de Oud (madera de agar), Azafrán, Nuez moscada, creando una experiencia olfativa única y sofisticada.",
    price: 50000,
    image: "https://m.media-amazon.com/images/I/61CZPc2+NXL._SL1000_.jpg",
    notes: {
      top: ["Oud (madera de agar)"],
      middle: ["Azafrán"],
      base: ["Nuez moscada"],
    },
    volume: "100ml",
    isNew: true
  },
  {
    id: "lattafa-khamrah",
    name: "Lattafa Khamrah",
    shortDescription: "Fragancia con notas de Whisky, Canela, Vainilla",
    description: "Una exquisita combinación de Whisky, Canela, Vainilla, creando una experiencia olfativa única y sofisticada.",
    price: 54000,
    image: "https://avinari.cl/cdn/shop/files/o.fDr4cjowxjt-1_800x.jpg?v=1725747470",
    notes: {
      top: ["Whisky"],
      middle: ["Canela"],
      base: ["Vainilla"],
    },
    volume: "100ml",
    isNew: true
  },
  {
    id: "al-haramain",
    name: "Amber Oud Gold Edition",
    shortDescription: "Fragancia con notas de Ámbar, Melón dulce, Vainilla",
    description: "Una exquisita combinación de Ámbar, Melón dulce, Vainilla, creando una experiencia olfativa única y sofisticada.",
    price: 93000,
    image: "https://aztra.pe/cdn/shop/files/resizedImg_1000x1000_2_3d2bf1d4-cb2a-4bb1-b181-8a81c6e766af.jpg?v=1737735497&width=1000",
    notes: {
      top: ["Ámbar"],
      middle: ["Melón dulce"],
      base: ["Vainilla"],
    },
    volume: "120ml",
    isBestseller: true
  },
  {
    id: "armaf-club",
    name: "Club de Nuit Intense Man",
    shortDescription: "Fragancia con notas de Piña, Abedul ahumado, Almizcle",
    description: "Una exquisita combinación de Piña, Abedul ahumado, Almizcle, creando una experiencia olfativa única y sofisticada.",
    price: 62000,
    image: "https://m.media-amazon.com/images/I/61c7p6Q4PiL.jpg",
    notes: {
      top: ["Piña"],
      middle: ["Abedul ahumado"],
      base: ["Almizcle"],
    },
    volume: "100ml",
    isBestseller: true
  },
  {
    id: "afnan-9pm",
    name: "Afnan 9PM",
    shortDescription: "Fragancia con notas de manzana, canela, lavanda silvestre",
    description: "Una exquisita combinación de manzana, canela y lavanda silvestre, creando una experiencia olfativa única y sofisticada.",
    price: 64000,
    image: "https://i0.wp.com/scentadvisors.com/wp-content/uploads/2024/05/afnan-9pm.jpg?ssl=1",
    notes: {
      top: ["Manzana"],
      middle: ["Canela"],
      base: ["Lavanda silvestre"],
    },
    volume: "100ml",
    isNew: true
  }
];

export async function getPerfumes(): Promise<Perfume[]> {
  try {
    // Usaremos la API con un tiempo de espera corto para evitar tiempos de carga largos
    // Si la API falla, devolveremos inmediatamente nuestros datos de respaldo
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // tiempo de espera más corto (3s)
    
    try {
      // Intentar obtener datos de la API usando configuraciones más simples
      const response = await fetch('https://api-perfumes-xukq.onrender.com/perfumes', {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.log('Respuesta de API no válida, usando datos de respaldo');
        return fallbackPerfumes;
      }
      
      const data = await response.json();
      
      // Verificar si los datos son válidos
      if (!Array.isArray(data) || data.length === 0) {
        console.log('Formato de datos de API no válido, usando datos de respaldo');
        return fallbackPerfumes;
      }
      
      // Mapear la estructura de datos de la API a nuestro tipo Perfume
      return data.map((item: any, index: number) => {
        // Asegurarse de que existan todos los campos requeridos
        const nombre = item.nombre || `Perfume ${index + 1}`;
        const notas = Array.isArray(item.notas) && item.notas.length > 0 
          ? item.notas 
          : ['Nota cítrica', 'Nota floral', 'Nota amaderada'];
        
        return {
          id: `perfume-${index + 1}`,
          name: nombre,
          shortDescription: `Fragancia con notas de ${notas.join(', ')}`,
          description: `Una exquisita combinación de ${notas.join(', ')}, creando una experiencia olfativa única y sofisticada.`,
          price: 120 + (index * 5), // Generar un precio basado en el índice
          image: item.imagen || "", // Cadena vacía si no hay imagen
          notes: {
            top: [notas[0] || "Notas cítricas"],
            middle: [notas[1] || "Notas florales"],
            base: [notas[2] || "Notas amaderadas"],
          },
          volume: "100ml", // Todos los perfumes son de 100ml
          isNew: index < 3, // Los primeros 3 elementos marcados como nuevos
          isBestseller: index >= 3 && index < 6, // Los siguientes 3 elementos marcados como más vendidos
        };
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.log('Error de fetch de API, usando datos de respaldo:', fetchError);
      return fallbackPerfumes;
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    return fallbackPerfumes;
  }
} 