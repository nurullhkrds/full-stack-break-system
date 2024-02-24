package com.ayssoft.yazilim_ots.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "breaks")
@Builder
public class Break {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "break_type")
    private String breakType;

    @Temporal(TemporalType.DATE)
    private Date createdDate;

    private LocalTime startTime;
    private LocalTime endTime;

    private int durationMinutes;
    @JsonIgnore  //User bilgileri gelmiyor.
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}