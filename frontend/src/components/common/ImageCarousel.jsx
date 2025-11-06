import { useMemo, useState } from 'react'

export function ImageCarousel({ images = [], altPrefix = 'Gallery image', aspectClassName = 'aspect-[16/9]', id }) {
  const validImages = useMemo(() => images.filter(Boolean), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselId = useMemo(() => id || `carousel-${Math.random().toString(36).slice(2, 8)}`, [id])

  if (!validImages.length) {
    return null
  }

  const goTo = (index) => {
    const nextIndex = (index + validImages.length) % validImages.length
    setActiveIndex(nextIndex)
  }

  const goPrevious = () => {
    goTo(activeIndex - 1)
  }

  const goNext = () => {
    goTo(activeIndex + 1)
  }

  return (
    <div className="carousel" aria-roledescription="carousel">
      <div className={`carousel__frame ${aspectClassName}`}>
        {validImages.map((imageUrl, index) => (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={`${altPrefix} ${index + 1}`}
            className={`carousel__image ${index === activeIndex ? 'carousel__image--active' : ''}`}
            data-active={index === activeIndex}
            loading={index === 0 ? 'eager' : 'lazy'}
            id={`${carouselId}-slide-${index}`}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <button
          type="button"
          className="carousel__control carousel__control--prev"
          onClick={goPrevious}
          aria-label="View previous image"
        >
          ‹
        </button>
        <button
          type="button"
          className="carousel__control carousel__control--next"
          onClick={goNext}
          aria-label="View next image"
        >
          ›
        </button>
      </div>
      <div className="carousel__dots" role="tablist" aria-label="Gallery slides">
        {validImages.map((_, index) => (
          <button
            key={`${carouselId}-dot-${index}`}
            type="button"
            className={`carousel__dot ${index === activeIndex ? 'carousel__dot--active' : ''}`}
            onClick={() => goTo(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`${carouselId}-slide-${index}`}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
