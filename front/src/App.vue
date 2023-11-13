<script setup>
</script>

<template>
     <el-row :gutter="20">
        <el-col :span="10"><div class="grid-content ep-bg-purple" />
            <orion-users />
        </el-col>
        <el-col :span="20"><div class="grid-content ep-bg-purple" />
            <orion-talk />
        </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
    margin-bottom: 10px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
