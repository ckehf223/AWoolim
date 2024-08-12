package com.kh.awoolim.mapper;

import com.kh.awoolim.common.domain.RefreshToken;

public interface RefreshTokenMapper {

	public void create(RefreshToken refreshToken);

	public RefreshToken read(String refresh);

	public void delete(String refresh);
	
	public void deleteAll(int userId);

}
