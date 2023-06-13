<template>
    <div class="sidebar">
      <div class="logo">My Sidebar</div>
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.id" :class="{ active: item.isActive }" @click="toggleActive(item)">
          {{ item.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "SidebarMenu",
    setup() {
      const menuItems = ref([
        { id: 1, label: "Home", isActive: true },
        { id: 2, label: "About", isActive: false },
        { id: 3, label: "Services", isActive: false },
        { id: 4, label: "Contact", isActive: false },
      ]);
  
      const toggleActive = (item) => {
        menuItems.value.forEach((menuItem) => {
          menuItem.isActive = menuItem.id === item.id;
        });
      };
  
      return {
        menuItems,
        toggleActive,
      };
    },
  };
  </script>
  
  <style>
  .sidebar {
    width: 200px;
    background-color: #f5f5f5;
    padding: 20px;
  }
  
  .logo {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    cursor: pointer;
    padding: 10px;
  }
  
  .menu li.active {
    background-color: #e9e9e9;
    font-weight: bold;
  }
  </style>
  