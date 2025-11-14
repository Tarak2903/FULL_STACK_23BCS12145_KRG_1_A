package FarmerAid.example.demo.dto;

public class APIResponse<T>{
    private String token;
    private T data;
    private String message;

    private APIResponse(Builder<T>x) {
        token=x.token;
        data=x.data;
        message=x.message;
    }
    public static class Builder<T>{
        private String token;
        private T data;
        private String message;

        public Builder<T> token(String token){
            this.token=token;
            return this;
        }
        public Builder<T> data(T data){
            this.data=data;
            return this;
        }
        public Builder<T> message(String message){
            this.message=message;
            return this;
        }
        public APIResponse<T>build(){
            return new APIResponse<>(this);
        }


    }
    public String getToken() {return token;}
    public T getData() {return data;}
    public String getMessage() {return message;}

}
