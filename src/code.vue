<template>
    <v-app>

        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs4 class="cardStyle">
                    <v-card>
                        <v-toolbar color="brown lighten-3" dark>
                            <v-toolbar-title class="text-xs-center">Available Products</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>search</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-list three-line>
                            <div v-for="(product, index) in products" :key="index">
                                <v-list-tile :key="product.title" avatar ripple @click="toggle(index)">
                                    <v-list-tile-avatar>
                                        <img :src="fetchImage(product.image)">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ product.title }} - {{ product.location }}</v-list-tile-title>
                                        <v-list-tile-sub-title class="text--primary">{{ product.content }}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{ product.price }}€</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-list-tile-action-text> {{ product.createdDate }}</v-list-tile-action-text>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
                            </div>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-flex>

                <!-- right container  -->
                <v-flex xs8>
                    <div class="displayFlex">

                        <!-- geolocation  -->
                        <div class="google-map" :id="map"></div>

                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        </div>
    </v-app>
</template>