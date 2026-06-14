/* jshint esversion: 6 */

const apiForm = document.querySelector("#ninja-api-form");
const apiCheckboxes = document.querySelectorAll("input[name='api-route']");
const apiInput = document.querySelector("#api-input");
const apiResponse = document.querySelector("#api-response");
const apiKey = "DfKn2iDax0GiRiI5YLtYlmqJEiwzH1QOIqDFujRT";

const apiRoutes = {
    dictionary: {
        endpoint: "https://api.api-ninjas.com/v1/dictionary",
        parameter: "word"
    },
    rhyme: {
        endpoint: "https://api.api-ninjas.com/v1/rhyme",
        parameter: "word"
    }
};

function getSelectedRoute() {
    return document.querySelector("input[name='api-route']:checked");
}

function buildApiUrl(routeName, inputValue) {
    const route = apiRoutes[routeName];
    const apiUrl = new URL(route.endpoint);

    apiUrl.searchParams.set(route.parameter, inputValue);

    return apiUrl.toString();
}

function validateApiForm(selectedRoute, inputValue) {
    if (!selectedRoute) {
        return "Please choose Dictionary or Rhyme.";
    }

    if (inputValue.length === 0) {
        return "Please enter one word.";
    }

    if (!/^[a-zA-Z]+$/.test(inputValue)) {
        return "Please use letters only and enter one word.";
    }

    return "";
}

function showApiResult(data) {
    apiResponse.textContent = JSON.stringify(data, null, 2);
}

function sendApiRequest(apiUrl) {
    fetch(apiUrl, {
        headers: {
            "X-Api-Key": apiKey
        }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            showApiResult(data);
        })
        .catch(function() {
            apiResponse.textContent = "The API request could not be completed.";
        });
}

apiCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        apiCheckboxes.forEach(function(otherCheckbox) {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });

        apiResponse.textContent = "";
    });
});

apiForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const selectedRoute = getSelectedRoute();
    const inputValue = apiInput.value.trim();
    const validationMessage = validateApiForm(selectedRoute, inputValue);

    apiResponse.textContent = "";

    if (validationMessage) {
        apiResponse.textContent = validationMessage;
        return;
    }

    sendApiRequest(buildApiUrl(selectedRoute.value, inputValue));
});
