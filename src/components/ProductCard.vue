<script setup>
import fallbackImage from '../assets/image-placeholder.svg'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add'])

function useFallbackImage(event) {
  event.target.onerror = null
  event.target.src = fallbackImage
}
</script>

<template>
  <article class="product-card">
    <div class="product-image-wrap">
      <img
        class="product-image"
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        @error="useFallbackImage"
      />
      <span class="product-category">{{ product.category }}</span>
    </div>
    <div class="product-info">
      <div class="product-copy">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-purchase">
        <strong>{{ product.price }} ₴</strong>
        <button
          class="add-button"
          type="button"
          :aria-label="`Додати ${product.name} до кошика`"
          @click="emit('add', product.id)"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  </article>
</template>
