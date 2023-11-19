#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Util/ServerApplication.h>
#include <Poco/JSON/Parser.h>
#include <Poco/JSON/Object.h>
#include <Poco/MongoDB/MongoDB.h>
#include <Poco/MongoDB/Connection.h>
#include <Poco/MongoDB/Database.h>


using namespace Poco::Net;
using namespace Poco::Util;
using namespace Poco::JSON;

class LoginRequestHandler : public HTTPRequestHandler {
public:
    void handleRequest(HTTPServerRequest& request, HTTPServerResponse& response) override {
        if (request.getMethod() == HTTPRequest::HTTP_POST) {
            // Handle the POST request for authentication
            Object::Ptr responseData = new Object;

            std::istream& input = request.stream();
            std::string jsonStr;
            char c;
            while (input.get(c)) {
                jsonStr += c;
            }

            // Parse the JSON request data
            Parser parser;
            Dynamic::Var result = parser.parse(jsonStr);
            if (result.isStruct()) {
                Object::Ptr requestObject = result.extract<Object::Ptr>();
                std::string username = requestObject->getValue<std::string>("username", "");
                std::string password = requestObject->getValue<std::string>("password", "");

                // Authenticate the user here (e.g., check against a data structure)
                bool authenticated = authenticateUser(username, password);

                // Prepare the response JSON
                responseData->set("authenticated", authenticated);
            }

            response.setContentType("application/json");
            response.setStatus(HTTPResponse::HTTP_OK);
            std::ostream& output = response.send();
            responseData->stringify(output);
        } else {
            // Handle other HTTP methods or show an HTML login form
            response.setStatus(HTTPResponse::HTTP_OK);
            response.setContentType("text/html");
            std::ostream& output = response.send();
            output << "<html><body>";
            output << "<form method='post' action='/login'>";
            output << "Username: <input type='text' name='username'><br>";
            output << "Password: <input type='password' name='password'><br>";
            output << "<input type='submit' value='Login'>";
            output << "</form>";
            output << "</body></html>";
        }
    }

    bool authenticateUser(const std::string& username, const std::string& password) {
        




        return (username == "user" && password == "password");
    }
};

class MyServerApp : public ServerApplication {
protected:
    int main(const std::vector<std::string>&) {
        HTTPServer server(new LoginRequestHandler, ServerSocket(8080), new HTTPServerParams);
        server.start();
        waitForTerminationRequest();
        server.stop();
        return Application::EXIT_OK;
    }
};
class AuthenticationSystem {
private:
    std::unordered_map<std::string, std::string> userCredentials;

public:
    AuthenticationSystem() {
        // Initialize with some sample user credentials (username and password)
        userCredentials["user1"] = "password1";
        userCredentials["user2"] = "password2";
        // You should hash and salt the passwords in a real system.
    }

    bool authenticate(const std::string& username, const std::string& password) {
        auto it = userCredentials.find(username);
        if (it != userCredentials.end() && it->second == password) {
            return true; // Authentication successful
        }
        return false; // Authentication failed
    }
    public:
    void handleRequest(HTTPServerRequest& request, HTTPServerResponse& response) override {
        if (request.getMethod() == HTTPRequest::HTTP_POST) {
            // Handle the POST request for authentication
            Object::Ptr responseData = new Object;

            std::istream& input = request.stream();
            std::string jsonStr;
            char c;
            while (input.get(c)) {
                jsonStr += c;
            }

            // Parse the JSON request data
            Parser parser;
            Dynamic::Var result = parser.parse(jsonStr);
            if (result.isStruct()) {
                Object::Ptr requestObject = result.extract<Object::Ptr>();
                std::string username = requestObject->getValue<std::string>("username", "");
                std::string password = requestObject->getValue<std::string>("password", "");

                // Authenticate the user here (e.g., check against a data structure)
                bool authenticated = authenticateUser(username, password);

                // Prepare the response JSON
                responseData->set("authenticated", authenticated);
            }

            response.setContentType("application/json");
            response.setStatus(HTTPResponse::HTTP_OK);
            std::ostream& output = response.send();
            responseData->stringify(output);
        } else {
            // Handle other HTTP methods or show an HTML login form
            response.setStatus(HTTPResponse::HTTP_OK);
            response.setContentType("text/html");
            std::ostream& output = response.send();
            output << "<html><body>";
            output << "<form method='post' action='/login'>";
            output << "Username: <input type='text' name='username'><br>";
            output << "Password: <input type='password' name='password'><br>";
            output << "<input type='submit' value='Login'>";
            output << "</form>";
            output << "</body></html>";
        }
    }
};

int main(int argc, char** argv) {
    MyServerApp app;
    return app.run(argc, argv);
}
