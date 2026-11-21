<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['increase', 'decrease', 'remove'])
</script>

<template>
  <article class="cart-item">
    <img :src="item.image" :alt="item.name" />
    <div class="cart-item-details">
      <div class="cart-item-title">
        <h3>{{ item.name }}</h3>
        <button
          class="remove-button"
          type="button"
          :aria-label="`Видалити ${item.name} з кошика`"
          @click="emit('remove')"
        >
          ×
        </button>
      </div>
      <span class="cart-item-price">{{ item.price }} ₴</span>
      <div class="quantity-control" :aria-label="`Кількість: ${item.quantity}`">
        <button
          type="button"
          :aria-label="`Зменшити кількість ${item.name}`"
          @click="emit('decrease')"
        >
          −
        </button>
        <span>{{ item.quantity }}</span>
        <button
          type="button"
          :aria-label="`Збільшити кількість ${item.name}`"
          @click="emit('increase')"
        >
          +
        </button>
      </div>
    </div>
  </article>
</template>
