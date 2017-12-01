//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('HWD', function(){
  it('.should() - assert that <title> is correct', function(){
    // https://on.cypress.io/visit
    cy.visit('localhost:3000')

    // Here we've made our first assertion using a '.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.

    // https://on.cypress.io/should
    // https://on.cypress.io/and

    // https://on.cypress.io/title
    cy.title().should('include', 'Cypress')
    //   ↲               ↲            ↲
    // subject        chainer      value
  })

  context('Querying', function(){
    beforeEach(function(){
      // Visiting our app before each test removes any state build up from
      // previous tests. Visiting acts as if we closed a tab and opened a fresh one
      cy.visit('localhost:3000')
    })

    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQuery

    it('cy.get() - query DOM elements', function(){
      // https://on.cypress.io/get

      // Get DOM elements by id
      cy.get('.headerLink1').should('contain', 'button')

      // Get DOM elements by class
      cy.get('.headerLink2').should('contain', 'button')

      // Use CSS selectors just like jQuery
    })

  })

/*  context('Traversal', function(){
    beforeEach(function(){
      cy.visit('https://example.cypress.io/commands/traversal')
    })

    // Let's query for some DOM elements and make assertions

    it('.children() - get child DOM elements', function(){
      // https://on.cypress.io/children
      cy.get('.traversal-breadcrumb').children('.active')
        .should('contain', 'Data')
    })

    it('.closest() - get closest ancestor DOM element', function(){
      // https://on.cypress.io/closest
      cy.get('.traversal-badge').closest('ul')
        .should('have.class', 'list-group')
    })

    it('.eq() - get a DOM element at a specific index', function(){
      // https://on.cypress.io/eq
      cy.get('.traversal-list>li').eq(1).should('contain', 'siamese')
    })

    it('.filter() - get DOM elements that match the selector', function(){
      // https://on.cypress.io/filter
      cy.get('.traversal-nav>li').filter('.active').should('contain', 'About')
    })

    it('.find() - get descendant DOM elements of the selector', function(){
      // https://on.cypress.io/find
      cy.get('.traversal-pagination').find('li').find('a')
        .should('have.length', 7)
    })

    it('.first() - get first DOM element', function(){
      // https://on.cypress.io/first
      cy.get('.traversal-table td').first().should('contain', '1')
    })

    it('.last() - get last DOM element', function(){
      // https://on.cypress.io/last
      cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')
    })

    it('.next() - get next sibling DOM element', function(){
      // https://on.cypress.io/next
      cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')
    })

    it('.nextAll() - get all next sibling DOM elements', function(){
      // https://on.cypress.io/nextall
      cy.get('.traversal-next-all').contains('oranges')
        .nextAll().should('have.length', 3)
    })

    it('.nextUntil() - get next sibling DOM elements until next el', function(){
      // https://on.cypress.io/nextuntil
      cy.get('#veggies').nextUntil('#nuts').should('have.length', 3)
    })

    it('.not() - remove DOM elements from set of DOM elements', function(){
      // https://on.cypress.io/not
      cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled')
    })

    it('.parent() - get parent DOM element from DOM elements', function(){
      // https://on.cypress.io/parent
      cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus')
    })

    it('.parents() - get parent DOM elements from DOM elements', function(){
      // https://on.cypress.io/parents
      cy.get('.traversal-cite').parents().should('match', 'blockquote')
    })

    it('.parentsUntil() - get parent DOM elements from DOM elements until el', function(){
      // https://on.cypress.io/parentsuntil
      cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav')
        .should('have.length', 2)
    })

    it('.prev() - get previous sibling DOM element', function(){
      // https://on.cypress.io/prev
      cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets')
    })

    it('.prevAll() - get all previous sibling DOM elements', function(){
      // https://on.cypress.io/prevAll
      cy.get('.fruits-list').find('.third').prevAll().should('have.length', 2)
    })

    it('.prevUntil() - get all previous sibling DOM elements until el', function(){
      // https://on.cypress.io/prevUntil
      cy.get('.foods-list').find('#nuts').prevUntil('#veggies')
    })

    it('.siblings() - get all sibling DOM elements', function(){
      // https://on.cypress.io/siblings
      cy.get('.traversal-pills .active').siblings().should('have.length', 2)
    })
  })
*/
  context('Actions', function(){
    beforeEach(function(){
      cy.visit('localhost:3000')
    })

    // Let's perform some actions on DOM elements
    // https://on.cypress.io/interacting-with-elements

    it('using .type() - type into an input element', function(){
      // https://on.cypress.io/type
      cy.get('.action-input')
        .type('some default text here').should('have.value', 'some default text here')
        .clear()

        // Delay each keypress by 0.1 sec

        .type('slow typing here', {delay: 100})
        .should('have.value', 'slow typing here')

    })

    it('.clear() - clears an input or textarea element', function(){
      // https://on.cypress.io/clear
      cy.get('.action-input').type('We are going to clear this text')
        .should('have.value', 'We are going to clear this text')
        .clear()
        .should('have.value', '')
    })
  })

  context('Location', function(){
    beforeEach(function(){
      cy.visit('localhost:3000')
    })

    // We look at the url to make assertions
    // about the page's state

    it('cy.hash() - get the current URL hash', function(){
      // https://on.cypress.io/hash
      cy.hash().should('be.empty')
    })

    it('cy.location() - get window.location', function(){
      // https://on.cypress.io/location
      cy.location().should(function(location){
        expect(location.hash).to.be.empty
        expect(location.href).to.eq('http://localhost:3000')
        expect(location.host).to.eq('localhost:3000')
        expect(location.hostname).to.eq('localhost')
        expect(location.origin).to.eq('http://localhost:3000')
        expect(location.pathname).to.eq('/')
        expect(location.port).to.eq('3000')
        expect(location.protocol).to.eq('http:')
        expect(location.search).to.be.empty
      })
    })

    it('cy.url() - get the current URL', function(){
      // https://on.cypress.io/url
      cy.url().should('eq', 'http://localhost:3000')
    })
  })

  // context('Navigation', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io')
  //     cy.get('.navbar-nav').contains('Commands').click()
  //     cy.get('.dropdown-menu').contains('Navigation').click()
  //   })

  //   it('cy.go() - go back or forward in the browser\'s history', function(){
  //     cy.location('pathname').should('include', 'navigation')

  //     // https://on.cypress.io/go
  //     cy.go('back')
  //     cy.location('pathname').should('not.include', 'navigation')

  //     cy.go('forward')
  //     cy.location('pathname').should('include', 'navigation')

  //     // equivalent to clicking back
  //     cy.go(-1)
  //     cy.location('pathname').should('not.include', 'navigation')

  //     // equivalent to clicking forward
  //     cy.go(1)
  //     cy.location('pathname').should('include', 'navigation')
  //   })

  //   it('cy.reload() - reload the page', function(){
  //     // https://on.cypress.io/reload
  //     cy.reload()

  //     // reload the page without using the cache
  //     cy.reload(true)
  //   })

  //   it('cy.visit() - visit a remote url', function(){
  //     // Visit any sub-domain of your current domain
  //     // https://on.cypress.io/visit

  //     // Pass options to the visit
  //     cy.visit('https://example.cypress.io/commands/navigation', {
  //       timeout: 50000, // increase total time for the visit to resolve
  //       onBeforeLoad: function(contentWindow){
  //         // contentWindow is the remote page's window object
  //       },
  //       onLoad: function(contentWindow){
  //         // contentWindow is the remote page's window object
  //       }
  //     })
  //     })
  // })

  // context('Assertions', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/assertions')
  //   })

  //   describe('Implicit Assertions', function(){

  //     it('.should() - make an assertion about the current subject', function(){
  //       // https://on.cypress.io/should
  //       cy.get('.assertion-table')
  //         .find('tbody tr:last').should('have.class', 'success')
  //     })

  //     it('.and() - chain multiple assertions together', function(){
  //       // https://on.cypress.io/and
  //       cy.get('.assertions-link')
  //         .should('have.class', 'active')
  //         .and('have.attr', 'href')
  //         .and('include', 'cypress.io')
  //     })
  //   })

  //   describe('Explicit Assertions', function(){
  //     it('expect - make an assertion about a specified subject', function(){
  //       // We can use Chai's BDD style assertions
  //       expect(true).to.be.true

  //       // Pass a function to should that can have any number
  //       // of explicit assertions within it.
  //       cy.get('.assertions-p').find('p')
  //         .should(function($p){
  //           // return an array of texts from all of the p's
  //           var texts = $p.map(function(i, el){
  //             // https://on.cypress.io/$
  //             return Cypress.$(el).text()
  //           })

  //           // jquery map returns jquery object
  //           // and .get() convert this to simple array
  //           texts = texts.get()

  //           // array should have length of 3
  //           expect(texts).to.have.length(3)

  //           // set this specific subject
  //           expect(texts).to.deep.eq([
  //             'Some text from first p',
  //             'More text from second p',
  //             'And even more text from third p'
  //           ])
  //         })
  //     })
  //   })
  // })

  // context('Misc', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/misc')
  //   })

  //   it('.end() - end the command chain', function(){
  //     // cy.end is useful when you want to end a chain of commands
  //     // and force Cypress to re-query from the root element

  //     // https://on.cypress.io/end
  //     cy.get('.misc-table').within(function(){
  //       // ends the current chain and yields null
  //       cy.contains('Cheryl').click().end()

  //       // queries the entire table again
  //       cy.contains('Charles').click()
  //     })
  //   })

  //   it('cy.exec() - execute a system command', function(){
  //     // cy.exec allows you to execute a system command.
  //     // so you can take actions necessary for your test,
  //     // but outside the scope of Cypress.

  //     // https://on.cypress.io/exec
  //     cy.exec('echo Jane Lane')
  //       .its('stdout').should('contain', 'Jane Lane')

  //     cy.exec('cat cypress.json')
  //       .its('stderr').should('be.empty')

  //     cy.exec('pwd')
  //       .its('code').should('eq', 0)
  //   })

  //   it('cy.focused() - get the DOM element that has focus', function(){
  //     // https://on.cypress.io/focused
  //     cy.get('.misc-form').find('#name').click()
  //     cy.focused().should('have.id', 'name')

  //     cy.get('.misc-form').find('#description').click()
  //     cy.focused().should('have.id', 'description')
  //   })

  //   it('cy.screenshot() - take a screenshot', function(){
  //     // https://on.cypress.io/screenshot
  //     cy.screenshot('my-image')
  //   })

  //   it('cy.wrap() - wrap an object', function(){
  //     // https://on.cypress.io/wrap
  //     cy.wrap({foo: 'bar'})
  //       .should('have.property', 'foo')
  //       .and('include', 'bar')
  //   })
  // })

  // context('Connectors', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/connectors')
  //   })

  //   it('.each() - iterate over an array of elements', function(){
  //     // https://on.cypress.io/each
  //     cy.get('.connectors-each-ul>li')
  //       .each(function($el, index, $list){
  //         console.log($el, index, $list)
  //       })
  //   })

  //   it('.its() - get properties on the current subject', function(){
  //     // https://on.cypress.io/its
  //     cy.get('.connectors-its-ul>li')
  //       // calls the 'length' property yielding that value
  //       .its('length')
  //       .should('be.gt', 2)
  //   })

  //   it('.invoke() - invoke a function on the current subject', function(){
  //     // our div is hidden in our script.js
  //     // $('.connectors-div').hide()

  //     // https://on.cypress.io/invoke
  //     cy.get('.connectors-div').should('be.hidden')

  //       // call the jquery method 'show' on the 'div.container'
  //       .invoke('show')
  //       .should('be.visible')
  //   })

  //   it('.spread() - spread an array as individual args to callback function', function(){
  //     // https://on.cypress.io/spread
  //     var arr = ['foo', 'bar', 'baz']

  //     cy.wrap(arr).spread(function(foo, bar, baz){
  //       expect(foo).to.eq('foo')
  //       expect(bar).to.eq('bar')
  //       expect(baz).to.eq('baz')
  //     })
  //   })

  //   it('.then() - invoke a callback function with the current subject', function(){
  //     // https://on.cypress.io/then
  //     cy.get('.connectors-list>li').then(function($lis){
  //       expect($lis).to.have.length(3)
  //       expect($lis.eq(0)).to.contain('Walk the dog')
  //       expect($lis.eq(1)).to.contain('Feed the cat')
  //       expect($lis.eq(2)).to.contain('Write JavaScript')
  //     })
  //   })
  // })

  // context('Aliasing', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/aliasing')
  //   })

  //   // We alias a DOM element for use later
  //   // We don't have to traverse to the element
  //   // later in our code, we just reference it with @

  //   it('.as() - alias a route or DOM element for later use', function(){
  //     // this is a good use case for an alias,
  //     // we don't want to write this long traversal again

  //     // https://on.cypress.io/as
  //     cy.get('.as-table').find('tbody>tr')
  //       .first().find('td').first().find('button').as('firstBtn')

  //     // maybe do some more testing here...

  //     // when we reference the alias, we place an
  //     // @ in front of it's name
  //     cy.get('@firstBtn').click()

  //     cy.get('@firstBtn')
  //       .should('have.class', 'btn-success')
  //       .and('contain', 'Changed')
  //   })
  // })

  // context('Waiting', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/waiting')
  //   })
  //   // BE CAREFUL of adding unnecessary wait times.

  //   // https://on.cypress.io/wait
  //   it('cy.wait() - wait for a specific amount of time', function(){
  //     cy.get('.wait-input1').type('Wait 1000ms after typing')
  //     cy.wait(1000)
  //     cy.get('.wait-input2').type('Wait 1000ms after typing')
  //     cy.wait(1000)
  //     cy.get('.wait-input3').type('Wait 1000ms after typing')
  //     cy.wait(1000)
  //   })

  //   // Waiting for a specific resource to resolve
  //   // is covered within the cy.route() test below
  // })

  // context('Network Requests', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/network-requests')
  //   })

  //   // Manage AJAX / XHR requests in your app

  //   it('cy.server() - control behavior of network requests and responses', function(){
  //     // https://on.cypress.io/server
  //     cy.server().should(function(server){
  //       // the default options on server
  //       // you can override any of these options
  //       expect(server.delay).to.eq(0)
  //       expect(server.method).to.eq('GET')
  //       expect(server.status).to.eq(200)
  //       expect(server.headers).to.be.null
  //       expect(server.response).to.be.null
  //       expect(server.onRequest).to.be.undefined
  //       expect(server.onResponse).to.be.undefined
  //       expect(server.onAbort).to.be.undefined

  //       // These options control the server behavior
  //       // affecting all requests

  //       // pass false to disable existing route stubs
  //       expect(server.enable).to.be.true
  //       // forces requests that don't match your routes to 404
  //       expect(server.force404).to.be.false
  //       // whitelists requests from ever being logged or stubbed
  //       expect(server.whitelist).to.be.a('function')
  //     })

  //     cy.server({
  //       method: 'POST',
  //       delay: 1000,
  //       status: 422,
  //       response: {}
  //     })

  //     // any route commands will now inherit the above options
  //     // from the server. anything we pass specifically
  //     // to route will override the defaults though.
  //   })

  //   it('cy.request() - make an XHR request', function(){
  //     // https://on.cypress.io/request
  //     cy.request('https://jsonplaceholder.typicode.com/comments')
  //       .should(function(response){
  //         expect(response.status).to.eq(200)
  //         expect(response.body).to.have.length(500)
  //         expect(response).to.have.property('headers')
  //         expect(response).to.have.property('duration')
  //       })
  //   })

  //   it('cy.route() - route responses to matching requests', function(){
  //     var message = 'whoa, this comment doesn\'t exist'
  //     cy.server()

  //     // **** GET comments route ****

  //     // https://on.cypress.io/route
  //     cy.route(/comments\/1/).as('getComment')

  //     // we have code that fetches a comment when
  //     // the button is clicked in scripts.js
  //     cy.get('.network-btn').click()

  //     // **** Wait ****

  //     // Wait for a specific resource to resolve
  //     // continuing to the next command

  //     // https://on.cypress.io/wait
  //     cy.wait('@getComment').its('status').should('eq', 200)

  //     // **** POST comment route ****

  //     // Specify the route to listen to method 'POST'
  //     cy.route('POST', '/comments').as('postComment')

  //     // we have code that posts a comment when
  //     // the button is clicked in scripts.js
  //     cy.get('.network-post').click()
  //     cy.wait('@postComment')

  //     // get the route
  //     cy.get('@postComment').then(function(xhr){
  //       expect(xhr.requestBody).to.include('email')
  //       expect(xhr.requestHeaders).to.have.property('Content-Type')
  //       expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()')
  //     })

  //     // **** Stubbed PUT comment route ****
  //     cy.route({
  //       method: 'PUT',
  //       url: /comments\/\d+/,
  //       status: 404,
  //       response: {error: message},
  //       delay: 500
  //     }).as('putComment')

  //     // we have code that puts a comment when
  //     // the button is clicked in scripts.js
  //     cy.get('.network-put').click()

  //     cy.wait('@putComment')

  //     // our 404 statusCode logic in scripts.js executed
  //     cy.get('.network-put-comment').should('contain', message)
  //   })
  // })

  // context('Files', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/files')
  //   })
  //   it('cy.fixture() - load a fixture', function(){
  //     // Instead of writing a response inline you can
  //     // connect a response with a fixture file
  //     // located in fixtures folder.

  //     cy.server()

  //     // https://on.cypress.io/fixture
  //     cy.fixture('example.json').as('comment')

  //     cy.route(/comments/, '@comment').as('getComment')

  //     // we have code that gets a comment when
  //     // the button is clicked in scripts.js
  //     cy.get('.fixture-btn').click()

  //     cy.wait('@getComment').its('responseBody')
  //       .should('have.property', 'name')
  //       .and('include', 'Using fixtures to represent data')

  //     // you can also just write the fixture in the route
  //     cy.route(/comments/, 'fixture:example.json').as('getComment')

  //     // we have code that gets a comment when
  //     // the button is clicked in scripts.js
  //     cy.get('.fixture-btn').click()

  //     cy.wait('@getComment').its('responseBody')
  //       .should('have.property', 'name')
  //       .and('include', 'Using fixtures to represent data')

  //     // or write fx to represent fixture
  //     // by default it assumes it's .json
  //     cy.route(/comments/, 'fx:example').as('getComment')

  //     // we have code that gets a comment when
  //     // the button is clicked in scripts.js
  //     cy.get('.fixture-btn').click()

  //     cy.wait('@getComment').its('responseBody')
  //       .should('have.property', 'name')
  //       .and('include', 'Using fixtures to represent data')
  //   })

  //   it('cy.readFile() - read a files contents', function(){
  //     // You can read a file and yield its contents
  //     // The filePath is relative to your project's root.

  //     // https://on.cypress.io/readfile
  //     cy.readFile('cypress.json').then(function(json) {
  //       expect(json).to.be.an('object')
  //     })

  //   })

  //   it('cy.writeFile() - write to a file', function(){
  //     // You can write to a file with the specified contents

  //     // Use a response from a request to automatically
  //     // generate a fixture file for use later
  //     cy.request('https://jsonplaceholder.typicode.com/users')
  //       .then(function(response){
  //         // https://on.cypress.io/writefile
  //         cy.writeFile('cypress/fixtures/users.json', response.body)
  //       })
  //     cy.fixture('users').should(function(users){
  //       expect(users[0].name).to.exist
  //     })

  //     // JavaScript arrays and objects are stringified and formatted into text.
  //     cy.writeFile('cypress/fixtures/profile.json', {
  //       id: 8739,
  //       name: 'Jane',
  //       email: 'jane@example.com'
  //     })

  //     cy.fixture('profile').should(function(profile){
  //       expect(profile.name).to.eq('Jane')
  //     })
  //   })
  // })

  // context('Local Storage', function(){
  //   beforeEach(function(){
  //     cy.visit('https://example.cypress.io/commands/local-storage')
  //   })
  //   // Although local storage is automatically cleared
  //   // to maintain a clean state in between tests
  //   // sometimes we need to clear the local storage manually

  //   it('cy.clearLocalStorage() - clear all data in local storage', function(){
  //     // https://on.cypress.io/clearlocalstorage
  //     cy.get('.ls-btn').click().should(function(){
  //       expect(localStorage.getItem('prop1')).to.eq('red')
  //       expect(localStorage.getItem('prop2')).to.eq('blue')
  //       expect(localStorage.getItem('prop3')).to.eq('magenta')
  //     })

  //     // clearLocalStorage() yields the localStorage object
  //     cy.clearLocalStorage().should(function(ls){
  //       expect(ls.getItem('prop1')).to.be.null
  //       expect(ls.getItem('prop2')).to.be.null
  //       expect(ls.getItem('prop3')).to.be.null
  //     })

  //     // **** Clear key matching string in Local Storage ****
  //     cy.get('.ls-btn').click().should(function(){
  //       expect(localStorage.getItem('prop1')).to.eq('red')
  //       expect(localStorage.getItem('prop2')).to.eq('blue')
  //       expect(localStorage.getItem('prop3')).to.eq('magenta')
  //     })

  //     cy.clearLocalStorage('prop1').should(function(ls){
  //       expect(ls.getItem('prop1')).to.be.null
  //       expect(ls.getItem('prop2')).to.eq('blue')
  //       expect(ls.getItem('prop3')).to.eq('magenta')
  //     })

  //     // **** Clear key's matching regex in Local Storage ****
  //     cy.get('.ls-btn').click().should(function(){
  //       expect(localStorage.getItem('prop1')).to.eq('red')
  //       expect(localStorage.getItem('prop2')).to.eq('blue')
  //       expect(localStorage.getItem('prop3')).to.eq('magenta')
  //     })

  //     cy.clearLocalStorage(/prop1|2/).should(function(ls){
  //       expect(ls.getItem('prop1')).to.be.null
  //       expect(ls.getItem('prop2')).to.be.null
  //       expect(ls.getItem('prop3')).to.eq('magenta')
  //     })
  //   })
  // })

  // context('Cookies', function(){
  //   beforeEach(function(){
  //     Cypress.Cookies.debug(true)

  //     cy.visit('https://example.cypress.io/commands/cookies')

  //     // clear cookies again after visiting to remove
  //     // any 3rd party cookies picked up such as cloudflare
  //     cy.clearCookies()
  //   })

  //   it('cy.getCookie() - get a browser cookie', function(){
  //     // https://on.cypress.io/getcookie
  //     cy.get('#getCookie .set-a-cookie').click()

  //     // cy.getCookie() yields a cookie object
  //     cy.getCookie('token').should('have.property', 'value', '123ABC')
  //   })

  //   it('cy.getCookies() - get browser cookies', function(){
  //     // https://on.cypress.io/getcookies
  //     cy.getCookies().should('be.empty')

  //     cy.get('#getCookies .set-a-cookie').click()

  //     // cy.getCookies() yields an array of cookies
  //     cy.getCookies().should('have.length', 1).should( function(cookies) {

  //       // each cookie has these properties
  //       expect(cookies[0]).to.have.property('name', 'token')
  //       expect(cookies[0]).to.have.property('value', '123ABC')
  //       expect(cookies[0]).to.have.property('httpOnly', false)
  //       expect(cookies[0]).to.have.property('secure', false)
  //       expect(cookies[0]).to.have.property('domain')
  //       expect(cookies[0]).to.have.property('path')
  //     })
  //   })

  //   it('cy.setCookie() - set a browser cookie', function(){
  //     // https://on.cypress.io/setcookie
  //     cy.getCookies().should('be.empty')

  //     cy.setCookie('foo', 'bar')

  //     // cy.getCookie() yields a cookie object
  //     cy.getCookie('foo').should('have.property', 'value', 'bar')
  //   })

  //   it('cy.clearCookie() - clear a browser cookie', function(){
  //     // https://on.cypress.io/clearcookie
  //     cy.getCookie('token').should('be.null')

  //     cy.get('#clearCookie .set-a-cookie').click()

  //     cy.getCookie('token').should('have.property', 'value', '123ABC')

  //     // cy.clearCookies() yields null
  //     cy.clearCookie('token').should('be.null')

  //     cy.getCookie('token').should('be.null')
  //   })

  //   it('cy.clearCookies() - clear browser cookies', function(){
  //     // https://on.cypress.io/clearcookies
  //     cy.getCookies().should('be.empty')

  //     cy.get('#clearCookies .set-a-cookie').click()

  //     cy.getCookies().should('have.length', 1)

  //     // cy.clearCookies() yields null
  //     cy.clearCookies()

  //     cy.getCookies().should('be.empty')
  //   })
  // })

  // context('Spies, Stubs, and Clock', function(){
  //   it('cy.spy() - wrap a method in a spy', function(){
  //     // https://on.cypress.io/spy
  //     cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')

  //     var obj = {
  //       foo () {}
  //     }

  //     var spy = cy.spy(obj, 'foo').as('anyArgs')

  //     obj.foo()

  //     expect(spy).to.be.called

  //   })

  //   it('cy.stub() - create a stub and/or replace a function with a stub', function(){
  //     // https://on.cypress.io/stub
  //     cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')

  //     var obj = {
  //       foo () {}
  //     }

  //     var stub = cy.stub(obj, 'foo').as('foo')

  //     obj.foo('foo', 'bar')

  //     expect(stub).to.be.called

  //   })

  //   it('cy.clock() - control time in the browser', function(){
  //     // create the date in UTC so its always the same
  //     // no matter what local timezone the browser is running in
  //     var now = new Date(Date.UTC(2017, 2, 14)).getTime()

  //     // https://on.cypress.io/clock
  //     cy.clock(now)
  //     cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
  //     cy.get('#clock-div').click()
  //       .should('have.text', '1489449600')
  //   })

  //   it('cy.tick() - move time in the browser', function(){
  //     // create the date in UTC so its always the same
  //     // no matter what local timezone the browser is running in
  //     var now = new Date(Date.UTC(2017, 2, 14)).getTime()

  //     // https://on.cypress.io/tick
  //     cy.clock(now)
  //     cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
  //     cy.get('#tick-div').click()
  //       .should('have.text', '1489449600')
  //     cy.tick(10000) // 10 seconds passed
  //     cy.get('#tick-div').click()
  //       .should('have.text', '1489449610')
  //   })
  // })

})
