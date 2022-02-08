import WPApi from 'wpapi'

<% if (options.extensions) { %>
import * as WPApiExtensions from 'wpapi-extensions'
<% } %>

const options = <%= serialize(options) %>
let wp = new WPApi(options)


export default async (ctx, inject) => {
  <% if (options.discover) { %>
    wp = await WPApi.discover(options.endpoint);
  <% } %>

  <% if (options.extensions) { %>
    WPApiExtensions.registerWuxt(wp)
  <% } %>

  <% if (options.customRoutes) { %>
    options.customRoutes.forEach(element => {
      const params = Object.assign({}, element.params);
      wp[element.name] = wp.registerRoute(element.extension, element.route, params);
    });
  <% } %>

  inject('wp', wp)
}
