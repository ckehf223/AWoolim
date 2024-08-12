package com.kh.awoolim.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Club;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.ClubMapper;
import com.kh.awoolim.mapper.ClubMemberMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ClubService {

	@Value("${upload.path}")
	private String uploadDir;

	private final ClubMapper clubMapper;
	private final ClubMemberMapper clubMemberMapper;

	public ClubService(ClubMapper clubMapper, ClubMemberMapper clubMemberMapper) {
		this.clubMapper = clubMapper;
		this.clubMemberMapper = clubMemberMapper;
	}

	public int register(Club club) {
		int count = clubMapper.clubCount(club.getUserId());
		if (count >= 3) {
			return 0;
		}
		clubMapper.create(club);
		return 1;
	}

	public List<Club> searchClubs(String searchTerm, Map<String, Object> filters) {
		return clubMapper.searchClubs(searchTerm, filters);
	}

	public Club readByClub(int clubNo) {
		return clubMapper.readClub(clubNo);
	}

	public Club readByClubNo(int clubNo) {
		Club club = clubMapper.readClub(clubNo);
		if (club != null && club.getClubImage() != null && !club.getClubImage().isEmpty()) {
			try {
				String clubImage = encodeImageToBase64(club.getClubImage().trim());
				club.setClubImage(clubImage);
			} catch (IOException e) {
				log.error("Error encoding image for club " + club.getClubNo() + ": " + e.getMessage());
			}
		}
		return club;
	}

	public Map<String, Object> readClub(int clubNo) throws IOException {
		Map<String, Object> clubData = new HashMap<>();
		Club club = clubMapper.readClub(clubNo);
		List<Club> clubList = clubMapper.readPopularTop4();
		List<Member> memberList = clubMemberMapper.readClubMember(clubNo);
		Map<String, String> imageList = new HashMap<>();

		if (club != null) {
			clubData.put("club", club);
			String clubImage = encodeImageToBase64(club.getClubImage().trim());
			imageList.put("clubImage0", clubImage);
		}

		if (clubList != null && !clubList.isEmpty()) {
			clubData.put("clubList", clubList);
			for (Club data : clubList) {
				String clubImage = encodeImageToBase64(data.getClubImage().trim());
				imageList.put("clubImage" + data.getClubNo(), clubImage);
			}
		}

		if (memberList != null && !memberList.isEmpty()) {
			clubData.put("memberList", memberList);
			for (Member data : memberList) {
				if (data.getUserBackImage() != null && !data.getUserBackImage().isEmpty()) {
					String backImage = encodeImageToBase64(data.getUserBackImage().trim());
					imageList.put("backImage" + data.getUserId(), backImage);
				}
				String userImage = encodeImageToBase64(data.getUserImage().trim());
				imageList.put("userImage" + data.getUserId(), userImage);
			}
		}

		clubData.put("imageData", imageList);
		return clubData;
	}

	public Map<String, Object> readMyClubList(int userId) throws IOException {
		Map<String, Object> clubMap = new HashMap<>();
		List<Club> apprList = clubMapper.readMyClubDisapprovalList(userId);
		List<Club> disaList = clubMapper.readMyApprovalClubList(userId);

		processClubImages(apprList);
		processClubImages(disaList);

		clubMap.put("apprList", apprList);
		clubMap.put("disaList", disaList);

		return clubMap;
	}

	public Map<String, Object> readMyMadeClubList(int userId) throws IOException {
		Map<String, Object> clubMap = new HashMap<>();
		Map<String, String> countMap = new HashMap<>();
		List<Club> clubList = clubMapper.readMyMadeClubList(userId);

		if (clubList != null && !clubList.isEmpty()) {
			for (Club data : clubList) {
				int count = clubMemberMapper.myClubSignupCount(data.getClubNo());
				countMap.put("count" + data.getClubNo(), String.valueOf(count));
				if (data.getClubImage() != null && !data.getClubImage().isEmpty()) {
					String clubImage = encodeImageToBase64(data.getClubImage().trim());
					data.setClubImage(clubImage);
				}
			}
			clubMap.put("clubList", clubList);
			clubMap.put("countMap", countMap);
		}

		return clubMap;
	}

	private void processClubImages(List<Club> clubList) throws IOException {
		if (clubList != null && !clubList.isEmpty()) {
			for (Club data : clubList) {
				if (data.getClubImage() != null && !data.getClubImage().isEmpty()) {
					String clubImage = encodeImageToBase64(data.getClubImage().trim());
					data.setClubImage(clubImage);
				}
			}
		}
	}

	public void modifyClub(Club club) {
		clubMapper.modifyClub(club);
	}

	public void addClubCount(int clubNo) {
		clubMapper.addClubCount(clubNo);
	}

	public void minusClubCount(int clubNo) {
		clubMapper.minusClubCount(clubNo);
	}

	public String encodeImageToBase64(String imagePath) throws IOException {
		Path path = Paths.get(imagePath);
		byte[] imageBytes = Files.readAllBytes(path);
		String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		return "data:image/jpeg;base64," + base64Image;
	}

	public List<Club> getAllClubs() {
		return clubMapper.getAllClubs();
	}
}
