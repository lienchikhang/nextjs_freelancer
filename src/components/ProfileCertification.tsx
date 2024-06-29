'use client';
import http from '@/libs/http/http';
import React, { useState } from 'react';

interface Props {
    data: any[],
}

const ProfileCertification: React.FC<Props> = ({ data }) => {

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
        const rs = await http.post('certification/add-one', {
            certiName: value,
        });
        setSkillList(prev => [...prev, rs.content]);
        setValue('');

        //close
        setOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    return (
        <div className={`skill__section`}>
            <div className={`section__heading`}>
                <p className='heading__title'>Certifications</p>
                <p className={`heading__link ${open ? 'disable' : 'active'}`} onClick={handleOpen}>Edit Certification</p>
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
                        return <li className='skill__item' key={idx}>{skill?.certi_name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default ProfileCertification