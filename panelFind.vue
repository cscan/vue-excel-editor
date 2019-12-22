<template>
  <div id="panelModal" v-show="show" class="panel-modal" @click="clickOutside" @keydown.exact.esc="hidePanel">
    <div id="panelFind" ref="panelFind" class="panel-body">
      <div>
        <input type="text"
               id="inputFind"
               ref="inputFind"
               v-model="inputFind"
               class="panel-input"
               trim autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               @keydown.exact.enter="doFind(inputFind, $event)" />
        <button class="panel-input-button" @click="doFind(inputFind)">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-sm"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      processing: false,
      inputFind: ''
    }
  },
  methods: {
    clickOutside (e) {
      if (e.target.id === 'panelModal') this.hidePanel()
    },
    doFind(s, e) {
      if (e) e.preventDefault()
      this.hidePanel()
      this.$parent.doFind(this.inputFind)
    },
    showPanel () {
      this.show = true
      setTimeout(() => (this.$refs.inputFind.focus()))
    },
    hidePanel () {
      this.show = false
    }
  }
}
</script>

<style scoped>

input:focus, button:focus {
  outline: none !important;
  box-shadow: inset 0 -1px 0 #ddd !important;
}

.panel-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #0007;
  z-index: 999;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
}

.panel-body {
  background-color: white;
  position: fixed;
  border-radius: 5px;
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28rem;
  max-width: 75vh;
  height: fit-content;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.panel-input-button {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: white;
  background-color: #28a745;
  border: 0;
  font-size: 1.4rem;
  width: 2.2rem;
  height: 2.35rem;
  vertical-align: -2px;
  position: relative;
}

.panel-input {
  padding: 0 0.5rem;
  font-size: 0.88rem;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: calc(100% - 3.3rem);
  border: 1px solid lightgray;
  border-right: 0;
  height: 2.2rem;
}

</style>
