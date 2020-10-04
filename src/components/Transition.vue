<template>
  <div id="app">
    <ul class="tab">
      <li
        v-for="item in list"
        @click="changeTab(item.id)"
        @keyup.enter="changeTab(item.id)"
        :class="{ active: active(item.id) }"
        tabindex="0"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="content-vue">
      <transition>
        <section v-for="item in list" :key="item.id" v-if="active(item.id)">
          <p>{{ item.content }}</p>
        </section>
      </transition>
    </div>
  </div>
</template>


<script>
/*
export default {
  name: 'app',
  data () {
    return {
    current: 1,
    list: [{
      id: 1,
      label: 'menu1',
      content: 'content1'
    }, {
      id: 2,
      label: 'menu2',
      content: 'content2'
    }, {
      id: 3,
      label: 'menu3',
      content: 'content3'
    }]
  }
  },
  methods: function() {
    active: function(id) {
      return this.current == id
    },
    changeTab: function(id) {
      this.current = id
    }
  }
};
*/
</script>

