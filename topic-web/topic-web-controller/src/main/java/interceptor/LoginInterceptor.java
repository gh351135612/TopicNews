package interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @Author chenxl
 * @Date 2017/2/4 11:08
 * @Describle
 */
public class LoginInterceptor implements HandlerInterceptor{


    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {


        httpServletResponse.setContentType("text/html;charser=utf-8");
        HttpSession session = httpServletRequest.getSession();
        String username = (String) session.getAttribute("username");
        ServletOutputStream outputStream = httpServletResponse.getOutputStream();
        if(username == null){


            outputStream.write("current username is empty".getBytes("utf-8"));
            outputStream.close();
            return true;

        }else{

            outputStream.write(("current username：" + username).getBytes("utf-8"));
            outputStream.close();
            return false;

        }




    }

    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {




    }

    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
