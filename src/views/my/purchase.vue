<template>
    <div class="purchase">
        <mu-container>
            <mu-expansion-panel>
                <div slot="header">Panel 1</div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                <mu-button slot="action" flat>Cancel</mu-button>
                <mu-button slot="action" flat color="primary">Save</mu-button>
            </mu-expansion-panel>
            <mu-expansion-panel>
                <div slot="header">Panel 2</div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </mu-expansion-panel>
            <mu-expansion-panel>
                <div slot="header">Panel 3</div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </mu-expansion-panel>
        </mu-container>
    </div>
</template>

<script>
export default {
  name: 'Purchase'
}
</script>

<style scoped>
</style>
