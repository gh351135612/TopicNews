package service;


import pojo.response.BasicResponse;
import pojo.user.RegistBean;


public interface UserService {



    BasicResponse regist(RegistBean registBean);

    int count();

    BasicResponse login(String username , String password);

}
