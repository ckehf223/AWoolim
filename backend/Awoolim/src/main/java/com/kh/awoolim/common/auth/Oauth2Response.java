package com.kh.awoolim.common.auth;

public interface Oauth2Response {
	public String getProviderId();

	public String getProvider();

	public String getEmail();

	public String getName();
}