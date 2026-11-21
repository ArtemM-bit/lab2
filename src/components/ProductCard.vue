<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add'])
const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 480%22%3E%3Crect width=%22640%22 height=%22480%22 fill=%22%23e9dfd0%22/%3E%3Ctext x=%2250%25%22 y=%2253%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2290%22 fill=%22%23845f43%22%3E%E2%98%95%3C/text%3E%3C/svg%3E'

function useFallbackImage(event) {
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
