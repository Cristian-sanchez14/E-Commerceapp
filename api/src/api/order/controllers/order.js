;('use strict')
const stripe = require('stripe')('sk_test_51MYvhVJdzcHxDUvhVDHjs4KSy5bo1wQD3wZ4Y8yygUFOqK7IcYLsU98CMmy9RxTexzV70JsC85zlxQHOR0fk3ToU00LQ6JTufE')
/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service('api::product.product')
            .findOne(product.id)

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title
              },
              unit_amount: Math.round(item.price * 100)
            },
            quantity: product.quantity
          }
        })
      )

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: 'http://localhost:5173/' + '?success=true',
        cancel_url: 'http://localhost:5173/' + '?success=false',
        line_items: lineItems
      })

      await strapi
        .service('api::order.order')
        .create({ data: { products, stripeId: session.id } })

      return { stripeSession: session }
    } catch (error) {
      ctx.response.status = 500
      return { error }
    }
  }
}))
