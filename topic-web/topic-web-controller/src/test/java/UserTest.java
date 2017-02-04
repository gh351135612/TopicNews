import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.response.BasicResponse;
import pojo.user.RegistBean;
import service.UserService;

/**
 * @Author chenxl
 * @Date 2017/2/3 20:59
 * @Describle
 */

public class UserTest {

    private ClassPathXmlApplicationContext context;

    @Before
    public void init(){

        context = new ClassPathXmlApplicationContext(
                new String[]{"spring-mvc.xml","spring-mybatis.xml"});

    }

    @Test
    public void begin(){

        UserService userService = (UserService) context.getBean("UserService");
        RegistBean registBean = new RegistBean();
        registBean.setUsername("admin1");
        registBean.setPassword("admin1");
        registBean.setNickname("nick1");
        registBean.setAge(12);
        registBean.setSex(1);
        BasicResponse regist = userService.regist(registBean);
        System.out.println(regist.toString());


    }





}
