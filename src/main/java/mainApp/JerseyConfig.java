package mainApp;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import service.controller.ScrapController;

import javax.ws.rs.ApplicationPath;

@Configuration
@Controller
@ApplicationPath("/api")
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(ScrapController.class);
    }
}
