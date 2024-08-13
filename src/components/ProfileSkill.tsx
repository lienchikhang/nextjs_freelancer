'use client';
import http from '@/libs/http/http';
import React, { useState } from 'react';

interface Props {
    data: any[],
}

const ProfileSkill: React.FC<Props> = ({ data }) => {

    console.log('data in skill', data);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [skillList, setSkillList] = useState<any[]>(data);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleAdd = async () => {
        //call api
        const rs = await http.post('skill/add-one', {
            skillName: value,
        });

        console.log('rs', rs);
        setSkillList(prev => [...prev, rs.content]);
        //close
        setOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    if (!data) {
        return <h1>Oops! Something Wrong!</h1>
    }

    return (
        <div className={`skill__section`}>
            <div className={`section__heading`}>
                <p className='heading__title'>Skills</p>
                <p className={`heading__link ${open ? 'disable' : 'active'}`} onClick={handleOpen}>Edit Description</p>
            </div>
            <div className={`section__add-skill ${open ? 'active' : 'disable'}`}>
                <input type="text" onChange={handleChange} placeholder='Add Skill (e.g: Voice Talent)' />
                <div className='adding__btn-group'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button className={`${value ? 'active' : 'disable'}`} onClick={handleAdd}>Add</button>
                </div>
            </div>
            <ul className="section__items">
                {
                    skillList.length != 0 && skillList.map((skill, idx: number) => {
                        return <li className='skill__item' key={idx}>{skill.skill_name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default ProfileSkill