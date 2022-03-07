// The Auth0 client, initialized in configureClient()
let auth0 = null;
let arrayCreated = false;
let pizzaCount = 1;
let pizzaPrice = 0;
let pizzaPriceTotal = 0;
let pizzaPriceCount = 0;
let checkoutString = "";

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
  try {
    console.log("Logging in", targetUrl);

    const options = {
      redirect_uri: window.location.origin
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

/**
 * Executes the logout flow
 */
const logout = () => {
  try {
    console.log("Logging out");
    auth0.logout({
      returnTo: window.location.origin
    });
  } catch (err) {
    console.log("Log out failed", err);
  }
};

/**
 * Retrieves the auth configuration from the server
 */
const fetchAuthConfig = () => fetch("/auth_config.json");

/**
 * Initializes the Auth0 client
 */
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
  });
};

/**
 * Checks to see if the user is authenticated. If so, `fn` is executed. Otherwise, the user
 * is prompted to log in
 * @param {*} fn The function to execute if the user is logged in
 */
const requireAuth = async (fn, targetUrl) => {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return fn();
  }

  return login(targetUrl);
};

/**
 * Calls the API endpoint with an authorization token
 */
const callApi = async () => {
  try {
    const token = await auth0.getTokenSilently();

    const response = await fetch("/api/external", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseData = await response.json();
    const responseElement = document.getElementById("api-call-result");

    responseElement.innerText = JSON.stringify(responseData, {}, 2);

    document.querySelectorAll("pre code").forEach(hljs.highlightBlock);

    eachElement(".result-block", (c) => c.classList.add("show"));
  } catch (e) {
    console.error(e);
  }
};

// Will run when page finishes loading
window.onload = async () => {
  await configureClient();

  // If unable to parse the history hash, default to the root URL
  if (!showContentFromUrl(window.location.pathname)) {
    showContentFromUrl("/");
    window.history.replaceState({ url: "/" }, {}, "/");
  }

  const bodyElement = document.getElementsByTagName("body")[0];

  // Listen out for clicks on any hyperlink that navigates to a #/ URL
  bodyElement.addEventListener("click", (e) => {
    if (isRouteLink(e.target)) {
      const url = e.target.getAttribute("href");

      if (showContentFromUrl(url)) {
        e.preventDefault();
        window.history.pushState({ url }, {}, url);
      }
    } else if (e.target.getAttribute("id") === "call-api") {
      e.preventDefault();
      callApi();
    }
  });

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    console.log("> User is authenticated");
    window.history.replaceState({}, document.title, window.location.pathname);
    updateUI();
    return;
  }

  console.log("> User not authenticated");

  const query = window.location.search;
  const shouldParseResult = query.includes("code=") && query.includes("state=");

  if (shouldParseResult) {
    console.log("> Parsing redirect");
    try {
      const result = await auth0.handleRedirectCallback();

      if (result.appState && result.appState.targetUrl) {
        showContentFromUrl(result.appState.targetUrl);
      }

      console.log("Logged in!");
    } catch (err) {
      console.log("Error parsing redirect:", err);
    }

    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
};

const recordPizza = () => {
      document.getElementById("pizzas").value = document.getElementById("pizzas").value + ']';
    console.log(document.getElementById("pizzas").value);
/*     pizzaCount = newPizzas[0].length; */
    console.log("Adding pizza to array, but do something else, please?");
//     createArrayForOrder();
    console.log(pizzaCount);
    console.log("Before call to increaseArrayLength");0
    console.log("After call to increaseArrayLength (and other things)");
//     console.log(newPizzas.length);
/*     newPizzas[0][pizzaCount-1][0] = JSON.stringify('{"size":"small", "extra":false}'); */
//     console.log(newPizzas[newPizzas.length-1][pizzaCount][0]);
//     console.log(pizzaCount);
    increaseArrayLength();
/*     console.log(newPizzas[0].length); */
    console.log(" is supposedly the new number of pizzas after we return from increasing the array length");

//     newPizzas.push('[""]');
//     newPizzas[0] = [];
/*     newPizzas[0].push('[""]');
    newPizzas[0][pizzaCount+1] = [];
    newPizzas[0][pizzaCount+1].push('[""]'); */
    pizzaCount++;
    console.log(pizzaCount);
    alert(`Here is where we would call the API for the payment provider and, after payment was completed, thank the user for their order`);
  };

const increaseArrayLength = () => {

//   console.log(newLength);
//   console.log(newPizzas[newPizzas.length-1].length);
/*   console.log(newPizzas[0].length); */
  console.log(" is supposedly the number of pizzas before we're increasing the array length");
/*   newPizzas[0].length++; */
//   console.log(newPizzas[newPizzas.length-1].length);

/*   newPizzas[0][pizzaCount] = []; */
/*   console.log(newPizzas[0].length); */
  console.log(" is supposedly the new number of pizzas as we're increasing the array length");
/*   newPizzas[0][pizzaCount].length++; */
/*   newPizzas[0][pizzaCount][0] = [""]; */
/*   console.log(newPizzas[0].length); */
  console.log(" is supposedly the new number of pizzas as we finish increasing the array length");
  //   console.log(newPizzas.length);
};


const experiment = () => {
//  document.getElementById("pizzas").value = "1";
  howLong = document.getElementById("pizzas").value;

  if (howLong.length<1) {
    pizza = '[';
  } else {
    pizza = '';
  }

  pizza = pizza + '[{';
  if (document.getElementById("small").checked==true) {
    pizza = pizza +'"size":"small"';
    pizzaPrice = 8;
  }
  if (document.getElementById("medium").checked==true) {
    pizza = pizza +'"size":"medium"';
    pizzaPrice = 10;
  }
  if (document.getElementById("large").checked==true)  {
    pizza = pizza +'"size":"large"';
    pizzaPrice = 12;
  }
  if (document.getElementById("extra").checked==true) {
    pizza = pizza + ', "extra":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "extra":false';
  }
  if (document.getElementById("anch").checked==true) {
    pizza = pizza + ', "anch":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "anch":false';
  }
  if (document.getElementById("cana").checked==true) {
    pizza = pizza + ', "cana":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "cana":false';
  }
  if (document.getElementById("pepp").checked==true) {
    pizza = pizza + ', "pepp":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "pepp":false';
  }
  if (document.getElementById("saus").checked==true) {
    pizza = pizza + ', "saus":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "saus":false';
  }
  if (document.getElementById("bape").checked==true) {
    pizza = pizza + ', "bape":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "bape":false';
  }
  if (document.getElementById("blol").checked==true) {
    pizza = pizza + ', "blol":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "blol":false';
  }
  if (document.getElementById("frba").checked==true) {
    pizza = pizza + ', "frba":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "frba":false';
  }
  if (document.getElementById("frga").checked==true) {
    pizza = pizza + ', "frga":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "frga":false';
  }
  if (document.getElementById("grol").checked==true) {
    pizza = pizza + ', "grol":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "grol":false';
  }
  if (document.getElementById("grpe").checked==true) {
    pizza = pizza + ', "grpe":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "grpe":false';
  }
  if (document.getElementById("mush").checked==true) {
    pizza = pizza + ', "mush":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "mush":false';
  }
  if (document.getElementById("onio").checked==true) {
    pizza = pizza + ', "onio":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "onio":false';
  }
  if (document.getElementById("pine").checked==true) {
    pizza = pizza + ', "pine":true';
    pizzaPrice += 1;
  } else {
    pizza = pizza + ', "pine":false';
  }
  pizza = pizza + '}]';

  howLong = document.getElementById("pizzas").value;

  if (howLong.length>1) {
    pizza = ',' + pizza;
  }

  pizzaPriceTotal += pizzaPrice;
  pizzaPriceCount++;

  console.log(pizzaPrice);
  console.log(pizzaPriceCount);

  document.getElementById("pizzas").value = document.getElementById("pizzas").value + pizza;

  document.getElementById("small").checked=false;
  document.getElementById("medium").checked=false;
  document.getElementById("large").checked=false;
  document.getElementById("extra").checked=false;
  document.getElementById("anch").checked=false;
  document.getElementById("cana").checked=false;
  document.getElementById("pepp").checked=false;
  document.getElementById("saus").checked=false;
  document.getElementById("bape").checked=false;
  document.getElementById("blol").checked=false;
  document.getElementById("frba").checked=false;
  document.getElementById("frga").checked=false;
  document.getElementById("grol").checked=false;
  document.getElementById("grpe").checked=false;
  document.getElementById("mush").checked=false;
  document.getElementById("onio").checked=false;
  document.getElementById("pine").checked=false;
  pizza = '';

  document.getElementById('activateMe').disabled=true;
// Assumes 10% sales tax 
  checkoutString = "Checkout ($" + pizzaPriceTotal*1.1 + " for " + pizzaPriceCount + " item\(s\))";
  console.log(checkoutString);
  console.log(" is the checkoutString");
  document.getElementById('toggleMe').disabled=false;
  document.getElementById('toggleMe').value = checkoutString;
//   document.getElementById('final-content').visibility="visible";

  console.log("Got into the experiment function");
//   console.log(pizza);
  console.log(document.getElementById("pizzas").value);
};
