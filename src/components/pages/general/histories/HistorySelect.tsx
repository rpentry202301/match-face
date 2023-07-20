<form
  data-testid="form"
  action="submit"
  onSubmit={(e) => {
    handleSubmit(e, formData);
  }}
>
  <div className="mb-[2vh]">
    <label htmlFor="month">回答月：</label>
    <select
      data-testid="month"
      name="month"
      id="month"
      className="border-2"
      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
    >
      <option value="">--</option>
      {deadlines.map((deadline) => (
        <option value={deadline} key={deadline}>
          {deadline}
        </option>
      ))}
    </select>
  </div>
  <div className="lg:flex justify-center mb-[2vh] max-w-[55vw] ml-[10vw]">
    <legend className="lg:w-[215px] lg:h-10 lg:leading-10">使用技術：</legend>
    <fieldset id="skill" name="skill">
      {skills.map((skill) => (
        <span key={skill.id} className="px-[10px] whitespace-nowrap">
          <input
            type="checkbox"
            id={skill.skill}
            name={skill.skill}
            value={skill.skill}
            onChange={(e) => setSkill(e, formData, setFormData)}
          />
          <label htmlFor={skill.skill}>{skill.skill}</label>
        </span>
      ))}
    </fieldset>
  </div>
  <OrangeButton label="絞り込み" type="submit" />
</form>;
