<template>
  <div id="panelModal" v-show="show" class="panel-modal" @click="clickOutside" @keydown.exact.esc="hidePanel">
    <div ref="panelFind" class="panel-body">
      <div>
        <span class="panel-input-b">
          <input type="text"
                 ref="inputFind"
                 v-model="inputFind"
                 class="panel-input"
                 trim autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                 @keydown.exact.enter="doFind(inputFind, $event)" />
        </span>
        <button class="panel-input-button" @click="doFind(inputFind)">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-sm"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    localizedLabel: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
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
  box-shadow: none !important;
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
  font-weight: 400;
  font-size: 1rem;
  text-shadow: none;
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
  white-space: nowrap;
}

.panel-input-b {
  display: inline-block;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: calc(100% - 2.2rem);
  border: 1px solid lightgray;
  border-right: 0;
  margin-right: -4px;
  height: 2.3rem;
}
.panel-input {
  border: 0;
  box-shadow: none;
  padding: 0.6rem;
  width: 100%;
  font-size: 0.88rem;
  background-color: transparent;
}
.panel-input-button {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: white;
  background-color: #28a745;
  border: 1px solid #28a745;
  font-size: 1.3rem;
  width: 2.2rem;
  height: 2.35rem;
  vertical-align: -2px;
  cursor: pointer;
}

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-fw {
  width: 1.25em;
}
.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.fa-fw {
  text-align: center;
  width: 1.25em;
}
.fa-xs {
  font-size: 0.75em;
}
.fa-sm {
  font-size: 0.875em;
}
.fa-1x {
  font-size: 1em;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
</style>
