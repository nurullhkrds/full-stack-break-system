package com.ayssoft.yazilim_ots.repository;

import com.ayssoft.yazilim_ots.entities.Break;
import com.ayssoft.yazilim_ots.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface IBreakRepository extends JpaRepository<Break, Integer> {
    List<Break> findAllByUserIdAndStartTimeBetween(int userId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    Set<Break> findAllByUser(User user);


    @Query("SELECT b FROM Break b WHERE b.endTime IS NULL")
    List<Break> findBreaksWithNullEndTime();
}
