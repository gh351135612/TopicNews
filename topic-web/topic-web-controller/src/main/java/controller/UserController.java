package controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import pojo.response.BasicResponse;
import pojo.user.RegistBean;
import service.UserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;


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


    @RequestMapping("/login")
    @ResponseBody
    public String login(HttpSession httpSession , @RequestParam("username") String username , @RequestParam("password") String password){



        httpSession.setAttribute("username",username);

        return "login";

    }


    @RequestMapping("/uploadImage")
    @ResponseBody
    public BasicResponse uploadImage(HttpServletRequest request , @RequestParam("file") MultipartFile multipartFile){

        String path = request.getSession().getServletContext().getRealPath("/") + "images";// 文件保存目录，也可自定为绝对路径
        String fileName = multipartFile.getOriginalFilename();// getOriginalFilename和getName是不一样的哦
        System.out.println(path);
        File targetFile = new File(path, fileName);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        try {
            multipartFile.transferTo(targetFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        BasicResponse basicResponse = new BasicResponse();
        basicResponse.setCode(BasicResponse.SUCCESS);
        basicResponse.setMsg(request.getContextPath() + "/images/" + fileName);
        return basicResponse;

    }


}
