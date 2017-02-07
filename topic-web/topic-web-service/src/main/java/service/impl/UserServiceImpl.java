package service.impl;

import dao.UserDao;
import org.springframework.stereotype.Service;
import pojo.response.BasicResponse;
import pojo.user.RegistBean;
import pojo.user.User;
import service.UserService;
import util.common.StringUtil;

import javax.annotation.Resource;
import java.util.List;



@Service("UserService")
public class UserServiceImpl implements UserService {
    
    @Resource
    private UserDao userDao;


    /**
     * 注册
     *
     * @param registBean
     * @return
     */
    public BasicResponse regist(RegistBean registBean) {

        BasicResponse basicResponse = new BasicResponse();
        if(!StringUtil.notEmpty(registBean.getUsername())){

            basicResponse.setCode(BasicResponse.PARAM_ERROR);
            basicResponse.setMsg("用户名为空");
            return basicResponse;

        }

        if(!StringUtil.notEmpty(registBean.getPassword())){

            basicResponse.setCode(BasicResponse.PARAM_ERROR);
            basicResponse.setMsg("密码为空");
            return basicResponse;

        }

        List<User> users = userDao.selectUserByName(registBean.getUsername());
        if(users == null || users.size() == 0){

            boolean b = userDao.insertUser(registBean);
            if(b == true){

                basicResponse.setCode(BasicResponse.SUCCESS);
                basicResponse.setMsg("注册成功");
            }else{

                basicResponse.setCode(BasicResponse.OTHER_ERROR);
                basicResponse.setMsg("数据库异常");

            }

            return basicResponse;

        }else{

            basicResponse.setCode(BasicResponse.OTHER_ERROR);
            basicResponse.setMsg("该用户已存在");
            return basicResponse;


        }


    }

    public int count() {
        return userDao.count();
    }

    /**
     * 登录
     *
     * @param username
     * @param password
     * @return
     */
    public BasicResponse login(String username, String password) {

        BasicResponse basicResponse = new BasicResponse();
        List<User> users = userDao.selectUserByName(username);
        if(users == null || users.size() == 0){

            basicResponse.setCode(BasicResponse.OTHER_ERROR);
            basicResponse.setMsg("当前用户不存在");
            return basicResponse;

        }

        if(users.size() !=1){

            basicResponse.setCode(BasicResponse.OTHER_ERROR);
            basicResponse.setMsg("当前用户名对应的用户不唯一");
            return basicResponse;

        }

        if(users.get(0).getPassword().equals(password)){

            basicResponse.setCode(BasicResponse.SUCCESS);
            basicResponse.setMsg("登录成功");

        }else{

            basicResponse.setCode(BasicResponse.PARAM_ERROR);
            basicResponse.setMsg("密码错误");

        }

        return basicResponse;

    }

}
