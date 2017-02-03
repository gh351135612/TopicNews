package util.common;

/**
 * @Author chenxl
 * @Date 2017/1/22 13:46
 * @Describle
 */
public class StringUtil {



    public static boolean notEmpty(String input){

        if(input == null){

            return false;

        }else if(input.isEmpty()){

            return false;


        }else{

            return true;

        }



    }




}
