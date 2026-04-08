<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="copyright">© 2025 Khai Blog. All rights reserved.</p>
      <p class="powered">Powered by Vue + Vite</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  padding: var(--spacing-lg) 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  text-align: center;
}

@media (min-width: 768px) {
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
  }
}

.copyright,
.powered {
  color: var(--text-muted);
  font-size: 14px;
}
</style>
