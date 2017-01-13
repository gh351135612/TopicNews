package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author chenxl
 * @Date 2017/1/12 17:24
 * @Describle
 */
@Controller
@RequestMapping("/news")
public class NewsController {


    @RequestMapping("/getNews")
    @ResponseBody
    public String getAllNews(){


        return "test";


    }




}
