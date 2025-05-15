// // components/OptimizedImage.tsx
// import { useState, useEffect } from "react";

// interface OptimizedImageProps {
//   src: string;
//   alt: string;
//   className?: string;
//   priority?: boolean;
//   quality?: number;
//   sizes?: string;
// }

// export const OptimizedImage = ({
//   src,
//   alt,
//   className = "",
//   priority = false,
//   quality = 85,
//   sizes = "(max-width: 768px) 100vw, 50vw",
// }: OptimizedImageProps) => {
//   const [imageSrc, setImageSrc] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadImage = async () => {
//       try {
//         // You can add image optimization logic here
//         // For example, using a CDN or image service
//         const optimizedSrc = `${src}?q=${quality}&w=${
//           window.innerWidth > 768 ? "1200" : "800"
//         }`;
//         setImageSrc(optimizedSrc);
//       } catch (error) {
//         console.error("Error loading image:", error);
//         setImageSrc(src); // Fallback to original
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadImage();
//   }, [src, quality]);

//   return (
//     <div className={`relative ${className}`}>
//       <img
//         src={imageSrc || src}
//         alt={alt}
//         className={`w-full h-full object-cover transition-opacity duration-300 ${
//           isLoading ? "opacity-0" : "opacity-100"
//         }`}
//         loading={priority ? "eager" : "lazy"}
//         sizes={sizes}
//         // Explicit dimensions - adjust these to your needs
//         width={1200}
//         height={800}
//       />
//       {isLoading && (
//         <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
//       )}
//     </div>
//   );
// };
