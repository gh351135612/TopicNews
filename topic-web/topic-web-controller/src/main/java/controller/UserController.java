package controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.response.BasicResponse;
import pojo.user.RegistBean;
import service.UserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;



@Controller
@RequestMapping("/user")
public class UserController {

    private Logger log = Logger.getLogger(UserController.class);
    @Resource
    private UserService userService;

    @RequestMapping("/showUser")
    @ResponseBody
    public String showUser(HttpServletRequest request, Model model){
        log.info("查询所有用户信息");
        return "showUser";
    }

    @RequestMapping("/registUser")
    @ResponseBody
    public BasicResponse regist(@RequestBody RegistBean registBean){

        return userService.regist(registBean);


    }

    @RequestMapping("/count")
    @ResponseBody
    public int count(){

        return userService.count();

    }







}
