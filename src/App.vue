<script setup>
import { computed, ref, watch } from 'vue'
import heroCoffeeImage from './assets/hero-coffee.jpg'
import CartItem from './components/CartItem.vue'
import ProductCard from './components/ProductCard.vue'
import { products } from './data/products.js'

const CART_STORAGE_KEY = 'kava-kolo-cart'
const storageError = ref('')
const searchQuery = ref('')
const selectedCategory = ref('Усі')
const sortOrder = ref('featured')
const orderSent = ref(false)
const orderError = ref('')

function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (!savedCart) return []

    const parsedCart = JSON.parse(savedCart)
    if (!Array.isArray(parsedCart)) {
      throw new TypeError('Збережений кошик має неправильний формат.')
    }

    return parsedCart.filter((item) => {
      const isKnownProduct = products.some((product) => product.id === item?.productId)
      return isKnownProduct && Number.isInteger(item.quantity) && item.quantity > 0
    })
  } catch (error) {
    console.error('Не вдалося прочитати кошик із localStorage.', error)
    storageError.value = 'Не вдалося відновити кошик. Починаємо з порожнього.'
    return []
  }
}

const cart = ref(loadCart())
const customer = ref({ name: '', phone: '', email: '' })
const categories = computed(() => ['Усі', ...new Set(products.map((product) => product.category))])

const visibleProducts = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('uk')
  const matchingProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'Усі' || product.category === selectedCategory.value
    const matchesName = product.name.toLocaleLowerCase('uk').includes(query)
    return matchesCategory && matchesName
  })

  if (sortOrder.value === 'price-asc') {
    return [...matchingProducts].sort((a, b) => a.price - b.price)
  }
  if (sortOrder.value === 'price-desc') {
    return [...matchingProducts].sort((a, b) => b.price - a.price)
  }
  return matchingProducts
})

const cartItems = computed(() =>
  cart.value
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId)
      return product ? { ...product, quantity: item.quantity } : null
    })
    .filter(Boolean),
)
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
const cartTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
const formatPrice = (price) =>
  new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 }).format(
    price,
  )

function addToCart(productId) {
  const existingItem = cart.value.find((item) => item.productId === productId)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ productId, quantity: 1 })
  }
  orderSent.value = false
}

function changeQuantity(productId, amount) {
  const item = cart.value.find((entry) => entry.productId === productId)
  if (!item) return

  item.quantity += amount
  if (item.quantity <= 0) removeFromCart(productId)
}

function removeFromCart(productId) {
  cart.value = cart.value.filter((item) => item.productId !== productId)
}

function submitOrder() {
  if (!cart.value.length) {
    orderError.value = 'Додайте товари до кошика, щоб оформити замовлення.'
    return
  }

  orderError.value = ''
  orderSent.value = true
  cart.value = []
  customer.value = { name: '', phone: '', email: '' }
}

watch(
  cart,
  (updatedCart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart))
      storageError.value = ''
    } catch (error) {
      console.error('Не вдалося зберегти кошик у localStorage.', error)
      storageError.value = 'Кошик оновлено, але його не вдалося зберегти на цьому пристрої.'
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <a class="brand" href="#" aria-label="Коло — на головну">
        <span class="brand-mark" aria-hidden="true">к</span>
        <span class="brand-name">коло<span>.</span></span>
      </a>
      <nav class="main-nav" aria-label="Головна навігація">
        <a href="#catalog">Меню</a>
        <a href="#about">Наша історія</a>
      </nav>
      <a class="header-cart" href="#cart" aria-label="Перейти до кошика">
        <span aria-hidden="true">Кошик</span>
        <span class="cart-badge">{{ cartCount }}</span>
      </a>
    </header>

    <main>
      <section id="about" class="hero">
        <div class="hero-copy">
          <p class="eyebrow"><span class="eyebrow-line"></span> КАВА, ЩО ОБ’ЄДНУЄ</p>
          <h1>Твоя маленька<br />пауза <em>посеред дня.</em></h1>
          <p class="hero-description">
            Від зерна до останнього ковтка — добираємо найкраще, щоб кожна зустріч була особливою.
          </p>
          <a class="button button-dark" href="#catalog">Обрати щось смачне <span aria-hidden="true">↗</span></a>
          <div class="hero-note"><span class="note-stars" aria-hidden="true">★★★★★</span> 4.9 — нас обирають щодня</div>
        </div>
        <div class="hero-visual">
          <img
            :src="heroCoffeeImage"
            alt="Свіжозварена кава у затишній кав'ярні"
          />
          <div class="hero-sticker"><span>свіже</span><strong>щодня</strong></div>
          <div class="hero-caption">Добра кава —<br />добрий привід.</div>
        </div>
      </section>

      <section id="catalog" class="shop-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span class="eyebrow-line"></span> ТРОХИ ТЕПЛА В ТВОЄМУ ДНІ</p>
            <h2>Що сьогодні <em>до смаку?</em></h2>
          </div>
          <p class="section-intro">Обирай улюблене — ми вже готуємо.</p>
        </div>

        <div class="shop-layout">
          <div class="catalog">
            <div class="catalog-tools">
              <label class="search-field">
                <span class="search-icon" aria-hidden="true">⌕</span>
                <input
                  v-model="searchQuery"
                  type="search"
                  aria-label="Пошук за назвою"
                  placeholder="Знайти у меню..."
                />
              </label>
              <label class="sort-field">
                <select v-model="sortOrder" aria-label="Сортувати товари">
                  <option value="featured">Спочатку популярне</option>
                  <option value="price-asc">Від дешевших</option>
                  <option value="price-desc">Від дорожчих</option>
                </select>
              </label>
            </div>

            <div class="category-list" aria-label="Фільтр за категорією">
              <button
                v-for="category in categories"
                :key="category"
                class="category-chip"
                :class="{ 'is-active': selectedCategory === category }"
                type="button"
                :aria-pressed="selectedCategory === category"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>

            <p class="result-count">Знайшли для тебе: <strong>{{ visibleProducts.length }} позицій</strong></p>
            <div v-if="visibleProducts.length" class="product-grid">
              <ProductCard
                v-for="product in visibleProducts"
                :key="product.id"
                :product="product"
                @add="addToCart"
              />
            </div>
            <div v-else class="empty-state search-empty">
              <span class="empty-icon" aria-hidden="true">⌕</span>
              <h3>Нічого не знайшлося</h3>
              <p>Спробуй іншу назву або обери іншу категорію.</p>
              <button
                class="text-button"
                type="button"
                @click="searchQuery = ''; selectedCategory = 'Усі'"
              >
                Скинути фільтри
              </button>
            </div>
          </div>

          <aside id="cart" class="cart-panel">
            <div class="cart-heading">
              <div>
                <p class="eyebrow">ТВОЄ ЗАМОВЛЕННЯ</p>
                <h2>Кошик <span>({{ cartCount }})</span></h2>
              </div>
              <span class="cart-bag" aria-hidden="true">⌑</span>
            </div>

            <div v-if="storageError" class="notice notice-error" role="status">{{ storageError }}</div>
            <div v-if="orderSent" class="notice notice-success" role="status">
              Дякуємо! Замовлення прийнято — скоро зв’яжемося з тобою.
            </div>
            <div v-if="orderError" class="notice notice-error" role="alert">{{ orderError }}</div>

            <div v-if="cartItems.length" class="cart-items">
              <CartItem
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
                @increase="changeQuantity(item.id, 1)"
                @decrease="changeQuantity(item.id, -1)"
                @remove="removeFromCart(item.id)"
              />
            </div>
            <div v-else class="empty-state cart-empty">
              <span class="empty-icon" aria-hidden="true">♡</span>
              <h3>Тут поки порожньо</h3>
              <p>Додай щось смачненьке — і ми подбаємо про решту.</p>
            </div>

            <div class="cart-total">
              <span>Разом</span>
              <strong>{{ formatPrice(cartTotal) }}</strong>
            </div>

            <form class="checkout-form" @submit.prevent="submitOrder">
              <p class="form-title">Оформити замовлення</p>
              <label>
                <span>Твоє ім’я</span>
                <input
                  v-model.trim="customer.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  placeholder="Наприклад, Олена"
                  required
                  minlength="2"
                />
              </label>
              <label>
                <span>Номер телефону</span>
                <input
                  v-model.trim="customer.phone"
                  type="tel"
                  name="phone"
                  autocomplete="tel"
                  placeholder="+380 00 000 00 00"
                  pattern="[\+0-9\s()-]{10,}"
                  title="Введи номер телефону щонайменше з 10 цифрами"
                  required
                />
              </label>
              <label>
                <span>Електронна пошта</span>
                <input
                  v-model.trim="customer.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="name@example.com"
                  required
                />
              </label>
              <button class="button button-dark checkout-button" type="submit" :disabled="!cartCount">
                Замовити <span aria-hidden="true">↗</span>
              </button>
              <p class="checkout-hint">Натискаючи кнопку, ти погоджуєшся з умовами замовлення.</p>
            </form>
          </aside>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <a class="brand footer-brand" href="#" aria-label="Коло — на головну">
        <span class="brand-mark" aria-hidden="true">к</span>
        <span class="brand-name">коло<span>.</span></span>
      </a>
      <p>Місце, де кава стає приводом бути ближче.</p>
      <span>© 2025 Коло. З теплом, для тебе.</span>
    </footer>
  </div>
</template>
