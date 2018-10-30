<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4">
                <div class="notification is-danger">
                    <slot name="body">
                        Algo andubo mal!
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
